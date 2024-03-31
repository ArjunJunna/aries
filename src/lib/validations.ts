import z from "zod";

export const createTeamSchema=z.object({
    email:z.string().email({message:'Invalid email format.'}),
    teamName:z.string().min(2,{message:'Team name must have at least 2 characters.'})
})

export const createFileSchema=z.object({
    fileName:z.string().min(2,{message:'File name must have at least 2 characters.'}),
    teamId:z.string(),
    userId:z.string()
})