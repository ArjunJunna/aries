import { Metadata } from "next";
import Workspace from "../components/Workspace";
import { fetchFileDetails } from "../action";
import { getAllTeamFileIds } from "../../teams/create/action";

export async function generateStaticParams(): Promise<any[]> {
  const allTeamFilesIds = await getAllTeamFileIds();
  if (allTeamFilesIds === undefined) {
    return [];
  }
  return allTeamFilesIds;
}

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
