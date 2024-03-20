"use server"
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


type CreateTeamType={
    email: string,
    teamName: string,
}

export const createTeam=async({email,teamName}:CreateTeamType)=>{
    try {
         const user = await prisma.user.findUnique({
           where: { email },
         });
         if (!user) {
           throw new Error("User not found");
         }
         await prisma.team.create({
           data: {
             name: teamName,
             user: { connect: { id: user.id } }, 
           },
         });
        return {
            status:200
        } 
         
    } catch (error) {
        console.log(error);
    }
}