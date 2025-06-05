import BooksModal from "@/app/@modal/(.)book-info/[id]/BooksModal";
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";
import { Metadata } from "next";
import { getBookById } from "@/app/books/_actions/getBookById";
import { Book } from "@/app/utils/types";

export async function generateMetadata({ params }): Promise<Metadata> {
  const resParams = await params;
  const book: Book = await getBookById(resParams.id);

  return {
    title: `${book.title} by ${book.author} - Everything Sapphic`,
    description: `Information about it for sapphics, by sapphic. Expect like screen time, tropes, levels of homophobia depicted, etc.`,
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams, params }: PageProps) {
  const resParams = await params;
  const infoId = resParams.id
  const session = await getServerSession(authOptions)

  return (
    <BooksModal mongoId={infoId} session={session} origin="info" />
  );
}
