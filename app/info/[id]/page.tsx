import Modal from "@/app/@modal/(.)info/[id]/Modal"
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";
import { getCoupleById } from "@/app/utils/getCoupleById";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const couple = await getCoupleById(params.id);
  
  return {
    title: `${couple.people[0].name} and ${couple.people[1].name} (${couple.origin}) - Everything Sapphic`,
    description: `Information about ${couple.people[0].name} and ${couple.people[1].name} in ${couple.origin} for sapphics, by sapphic. Expect like screen time, tropes, levels of homophobia depicted, etc.`,
  }
}

export default async function Home({ searchParams, params }) {
  const infoId = params.id
  const session = await getServerSession(authOptions)

  return (
    <Modal mongoId={infoId} session={session} origin="info" />
  );
}
