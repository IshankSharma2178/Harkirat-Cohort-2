import {z} from "zod"

export const signUpSchema=z.object({
    userName:z.string().optional(),
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional(), 
})

export type SignupParams = z.infer<typeof signUpSchema>