"use server"
import prisma from "@/lib/prisma";
import { CreateTeamType } from "@/lib/types";
import { createTeamSchema } from "@/lib/validations";

export const createTeam=async({email,teamName}:CreateTeamType)=>{
    try {
       const {success} = createTeamSchema.safeParse({
         email,
         teamName,
       });
       if(!success){
        return { status: 400, message: "Invalid values entered." };
       }
      
        const user = await prisma.user.findUnique({
           where: { email },
         });
          await prisma.team.create({
            data: {
              name: teamName,
              user: { connect: { id: user?.id } },
            },
          });
          return {
            status: 200,
          };   
    } catch (error) {
        console.log(error);
    }
}