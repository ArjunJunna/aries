import { Metadata } from "next";
import Workspace from "../components/Workspace";
import { fetchFileDetails } from "../action";

export async function generateMetadata({
  params,
}: {
  params: { fileId: string };
}): Promise<Metadata> {
  const file=await fetchFileDetails(params.fileId);
  return {
    title: file?.name,
    description:`File created by ${file?.author}.`
  };
}


const WorkspacePage = async({ params }: { params: { fileId: string } }) => {
const fileId=params.fileId;
  return (
    <>
      <Workspace fileId={fileId}/>
    </>
  );
};

export default WorkspacePage;
