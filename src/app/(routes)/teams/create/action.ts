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

export const fetchTeamByFileId=async(id:string)=>{
  try {
      const team=await prisma.team.findUnique({
        where:{id},
      })
      if(team==null) return {status:400,message:'Team not found.'}
      return team
  } catch (error) {
    console.log(error);
  }
}
export const getAllTeamFileIds = async ()=> {
  try {
    const allTeamFiles = await prisma.team.findMany({
      include: {
        files: { select: { id: true } },
      },
    });

    const fileIds: string[] = [];
    allTeamFiles.forEach((team) => {
      team.files.forEach((file) => {
        fileIds.push(file.id);
      });
    });

    return fileIds;
  } catch (error) {
    console.log("Error fetching file IDs:", error);
  }
};