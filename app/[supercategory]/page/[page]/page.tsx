
import GridLayout from "@/app/_layout-components/GridLayout";
import GridSkeleton from "@/app/_layout-components/GridSkeleton";
import styles from "@/app/page.module.css"
import PaginationConductor from "@/app/_nav-components/PaginationConductor";
import { getCouples } from "@/app/utils/getCouples";
import Modal from "@/app/@modal/(.)info/[id]/Modal"
import { countCouples } from "@/app/utils/countCouples";
import { ShortCouple } from "@/app/utils/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { unstable_cache } from "next/cache";
import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from "react";
import { ModalSkeleton } from "@/app/@modal/(.)info/[id]/ModalSkeleton";

interface PageProps {
  params: Promise<{ supercategory: string, page: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const linkDict = {
    "home": "media to watch/read",
    "tv-shows": "TV shows to watch",
    "movies": "movies to watch",
    "books": "books to read"
  }

  const filterLookup = {
    'most-liked': 'Most liked',
    'recently-added': 'Recently added',
    'most-recent': 'Most recent releases',
    'more-diverse': 'More diversity!',
    'happy-endings': 'Happy endings'
  };

  const resParams = await params;
  const resSearchParams = await searchParams;
  const supercategory = resParams.supercategory
  const extraFilter = resSearchParams.filter
  const tag = resSearchParams.tag


  return {
    title: `Sapphic ${linkDict[supercategory]}${extraFilter ? " – " + filterLookup[extraFilter] : ""}${tag ? " – " + tag : ""}`,
    description: `Search for lesbian, bisexual, wlw ${supercategory} in our collaborative catalog of sapphic media`,
  }
}

const getCachedData = unstable_cache(
  async (supercategory, page, extraFilter, tag) => {
    try {
      const couples: ShortCouple[] = await getCouples(supercategory, page, extraFilter, tag)

      if (couples) {
        return couples
      } else {
        throw new Error("Database Error")
      }
    }
    catch (e) {
      throw new Error(e instanceof Error ? e.message : String(e))
    }
  }, [], {
  tags: ["coupleData"]
})

async function getPages(supercategory: string, extraFilter: string | undefined) {
  try {
    const count = await countCouples(supercategory, extraFilter)

    if (count) {
      return Math.ceil(count / 9)
    } else {
      return 3
    }
  }
  catch (e) {
    return 3
  }
};


export default async function Home({ searchParams, params }: PageProps) {
  const paramsRes = await params
  const searchParamsRes = await searchParams

  const page = paramsRes.page
  const supercategory = paramsRes.supercategory
  const extraFilter = searchParamsRes.filter || ""
  const tag = searchParamsRes.tag
  const infoId = searchParamsRes.info

  const couples: ShortCouple[] = await getCachedData(supercategory, Number(page), extraFilter, tag)
  const nbPages = await getPages(supercategory, extraFilter)
  const session = await getServerSession(authOptions)

  return (
    <>
      <main className={styles.main}>
        <Suspense fallback={<GridSkeleton />}>
          <GridLayout couples={couples} />
        </Suspense>
        <PaginationConductor supercategory={supercategory} page={page} current={supercategory + "/page/" + page} totalPages={nbPages} extraFilter={extraFilter} />
      </main>
      <Suspense fallback={<ModalSkeleton />}>
        {infoId && <Modal mongoId={infoId} session={session} origin="home" />}
      </Suspense>
    </>
  );
}
