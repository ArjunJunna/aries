"use server";
import prisma from "@/lib/prisma";

export const fetchFileDetails = async (fileId: string) => {
  try {
    const fileDetails = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
    });
    return fileDetails;
  } catch (error) {
    console.log(error);
  }
};

export const updateFileDocument = async (fileId: string, document: string) => {
  try {
    const fileDetails = await prisma.file.update({
      where: {
        id: fileId,
      },
      data: { document },
    });
    return { status: 200, fileDetails };
  } catch (error) {
    console.log(error);
  }
};
