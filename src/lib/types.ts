import { z } from "zod";
import { createTeamSchema } from "./validations";

export type File = {
  archive: boolean;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  document: string;
  id: string;
  name: string;
  teamId: string;
  whiteboard: string;
};

export type UserTeam = {
  id: string;
  name: string;
  userId: string;
};

export type CreateTeamType=z.infer<typeof createTeamSchema >