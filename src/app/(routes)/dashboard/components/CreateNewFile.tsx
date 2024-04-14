import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Constant from "@/utils/Constant";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { createFileSchema } from "@/lib/validations";
import { createNewFile, fetchAllFilesOfTeam } from "../action";
import FormSubmitButton from "@/components/FormSubmitButton";
import { UserTeam } from "@/lib/types";


type CreateNewFileProps = {
  activeTeam: UserTeam | undefined;
  totalTeamFiles: number;
  getTeamFiles: (teamId: string) => Promise<void>;
};

const CreateNewFile = ({activeTeam,totalTeamFiles,getTeamFiles}:CreateNewFileProps) => {
      const { user } = useKindeBrowserClient();
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-6 w-full
          justify-start bg-blue-500 font-bold text-white hover:bg-blue-600 hover:text-white "
          >
            New File
          </Button>
        </DialogTrigger>
        {totalTeamFiles < Constant.MAX_FREE_FILE ? (
          <DialogContent>
            <form
              action={async (formData) => {
                const data = Object.fromEntries(formData.entries());
                const result = createFileSchema.safeParse(data);

                if (result.success) {
                  const res = await createNewFile(formData);
                  if (res?.status === 200) {
                    getTeamFiles(activeTeam?.id as string);
                    toast(res.message);
                  }
                } else {
                  toast(
                    "File creation failed. File name must have at least 2 characters.",
                  );
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>Create New File</DialogTitle>
                <DialogDescription>
                  <Input type="hidden" name="teamId" value={activeTeam?.id} />
                  <Input
                    type="hidden"
                    name="userId"
                    value={activeTeam?.userId}
                  />
                  <Input type="text" name="fileName" />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <FormSubmitButton className="mt-4 ">Submit</FormSubmitButton>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{`Hi ${user?.given_name}`}</DialogTitle>
              <DialogDescription>
                You have the reached the maximum number of files for a team.
                Only 5 files for a team is allowed. To create more files upgrade
                the existing plan.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default CreateNewFile;
