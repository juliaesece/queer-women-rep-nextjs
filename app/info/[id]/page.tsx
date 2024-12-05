import Modal from "@/app/@modal/(.)info/[id]/Modal"
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";

export default async function Home({ searchParams, params }) {
  const infoId = params.id
  const session = await getServerSession(authOptions)

  return (
    <Modal mongoId={infoId} session={session} origin="info" />
  );
}
