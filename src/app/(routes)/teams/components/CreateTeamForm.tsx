'use client';

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTeam } from "../create/action";

const formSchema = z.object({
  teamName: z
    .string()
    .min(2, {
      message: "Form name must at least be 2 characters.",
    })
    .max(10),
});


const CreateTeamForm = () => {
      const router = useRouter();
      const { user } = useKindeBrowserClient();
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          teamName: "",
        },
      });

      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          await createTeam({
            email: user?.email as string,
            teamName: values.teamName,
          }).then((res) => {
            console.log("res from sumbit", res);
            if (res?.status == 200) {
              toast("New team created successfully.");
              router.push("/dashboard");
            }
          });
        } catch (error) {
          alert("Something went wrong, please try again.");
        }
      }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the team name here..." {...field} />
                </FormControl>
                <FormDescription>This is your team name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default CreateTeamForm