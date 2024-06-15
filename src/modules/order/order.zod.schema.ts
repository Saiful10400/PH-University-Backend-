import { z } from 'zod'

// Define the Zod schema for Order
// export const orderZodSchema = z.object({
//     email: z.string().email(), 
//     productId: z.string().length(24),
//     price: z.number().nonnegative(), 
//     quantity: z.number().int().nonnegative()
// });

export const orderZodSchema = z.object({
    email: z.string({ message: "Valid email address is Required." }).email({ message: "Invalid email address format." }),
    productId: z.string({message:"Valid Product id is required."}).length(24, { message: "Product ID must be exactly 24 characters long." }),
    price: z.number({ required_error: "Price is required." }).nonnegative({ message: "Price must be a non-negative number." }),
    quantity: z.number({ required_error: "Quantity is required." })
        .int({ message: "Quantity must be an integer." })
        .nonnegative({ message: "Quantity must be a non-negative number." })
});

export const orderZodEmailSchema=z.string().email()