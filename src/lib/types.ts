export type File = {
  archive: boolean;
  author: string;
  createdAt: Date;
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

export type CreateTeamType = {
  email: string;
  teamName: string;
};