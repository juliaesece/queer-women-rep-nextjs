import Modal from "@/app/@modal/(.)info/[id]/Modal"
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";
import { getCoupleById } from "@/app/utils/getCoupleById";
import { Metadata } from "next";

  interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const couple = await getCoupleById((await params).id);
  
  return {
    title: `${couple.people[0].name} and ${couple.people[1].name} (${couple.origin}) - Everything Sapphic`,
    description: `Information about ${couple.people[0].name} and ${couple.people[1].name} in ${couple.origin} for sapphics, by sapphic. Expect like screen time, tropes, levels of homophobia depicted, etc.`,
  }
}



export default async function Home({ searchParams, params }: PageProps) {
  const resParams = await params
  const infoId =  resParams.id as string
  const session = await getServerSession(authOptions)

  return (
    <Modal mongoId={infoId} session={session ?? undefined} origin="info" />
  );
}
