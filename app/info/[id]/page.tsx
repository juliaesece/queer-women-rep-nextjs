import Modal from "@/app/_layout-components/Modal"

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

type ParamProps = {
  id: string
}
export default function Page({ params, searchParams } : {params: ParamProps, searchParams: SearchParamProps}) {
  // const show = searchParams?.show;
  const mongo_id = params.id
  return (
    <>
      <Modal mongoId={mongo_id}/>
    </>
  );
}