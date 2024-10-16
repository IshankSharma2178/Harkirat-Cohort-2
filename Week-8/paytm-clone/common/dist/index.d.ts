import { z } from "zod";
export declare const signUpSchema: z.ZodObject<{
    userName: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userName?: string | undefined;
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    userName?: string | undefined;
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export type SignupParams = z.infer<typeof signUpSchema>;
