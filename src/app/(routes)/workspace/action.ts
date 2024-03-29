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

export const updateFileById = async (
  fileId: string,
  dataToUpdate: { document?: string; whiteboard?: string },
) => {
  try {
    const fileDetails = await prisma.file.update({
      where: {
        id: fileId,
      },
      data: dataToUpdate,
    });
    return { status: 200, fileDetails };
  } catch (error) {
    console.log(error);
  }
};


