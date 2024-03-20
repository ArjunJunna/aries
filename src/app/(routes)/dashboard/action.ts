"use server";
import prisma from "@/lib/prisma";

export async function checkForUserTeam(email: string) {
  try {
      const result = await prisma.user.findMany({
    where: {
      email,
      teams: {
        some: {}
      }
    },
  });
  console.log("from server checkForUserTeam:", result);
  return result;
  } catch (error) {
    console.log(error)
  }
 
}
