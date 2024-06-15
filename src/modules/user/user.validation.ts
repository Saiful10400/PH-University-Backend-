import { z } from "zod";
import { TUser } from "./user.interface";

export const UserZodSchema = z.object({
   
  password: z
    .string({invalid_type_error:"Password mustbe a string."})
    .length(20, { message: "password shold not more than 20 cherecter." }).optional(),
    role:z.enum(["student","faculty","admin"]),
    
});

