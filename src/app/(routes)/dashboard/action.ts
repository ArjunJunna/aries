"use server";
import prisma from "@/lib/prisma";

export async function checkForUserTeam(email: string) {
  try {
    const result = await prisma.user.findMany({
      where: {
        email,
        teams: {
          some: {},
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserTeams(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { teams: true },
    });
    return user?.teams;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createNewFile(formData: FormData) {
  try {
    const fileName = formData.get("fileName");
    const userId = formData.get("userId");
    const teamId = formData.get("teamId");

    const author = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (author) {
      const response = await prisma.file.create({
        data: {
          name: fileName as string,
          author: author?.name as string,
          team: { connect: { id: Number(teamId) } },
          archive:false,
          document:"",
          whiteboard:""
        },
      });
      return { status: 200, message: `File ${response?.name} created.` };
    } else {
      return { message: "File could not be created.Try Again." };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllFilesOfTeam(teamId:number){
  try {
     const response = await prisma.file.findMany({
    where:{
      teamId:teamId
    }
  })
  return response
  } catch (error) {
    console.log(error)
  }
}