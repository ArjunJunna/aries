import { Metadata } from "next";
import CreateTeamForm from "../components/CreateTeamForm";

export const metadata: Metadata = {
  title:  "Create Team",
};

const CreateTeam = () => {
  return (
    <>
      <div className="flex h-screen w-auto flex-col items-center justify-center space-y-6  text-primary max-sm:px-4">
        <h1 className="font-mono text-6xl">Aries</h1>
        <h1 className="font-sans text-4xl max-sm:text-center">
          What should we name your team?
        </h1>
        <h4 className="font-sans max-sm:text-center">
          You can edit the name of your team later in settings.
        </h4>
        <CreateTeamForm/>
      </div>
    </>
  );
};

export default CreateTeam;
