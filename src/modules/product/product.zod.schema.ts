import { z } from 'zod';

// Define the Variant schema with custom error messages
const VariantSchema = z.object({
    type: z.string({ message: "Variant type is required." }),
    value: z.string({ message: "Variant value is required." })
},{ required_error: "Variant is required." });

// Define the Inventory schema with custom error messages
const InventorySchema = z.object({
    quantity: z.number({ required_error: "Inventory quantity is required." }),
    inStock: z.boolean({ required_error: "Inventory inStock status is required." })
},{ required_error: "Inventory is required." });

// Define the Product schema with custom error messages
const productZodSchema = z.object({
    name: z.string({ message: "Product name is required." }),
    description: z.string({ message: "Product description is required." }),
    price: z.number({ required_error: "Product price is required." }).positive({ message: "Product price must be a positive number." }),
    category: z.string({ message: "Product category is required." }),
    tags: z.array(z.string(), { required_error: "Product tags are required." }).nonempty({ message: "Product tags must contain at least one tag." }),
    variants: z.array(VariantSchema, { required_error: "Product variants are required." }).nonempty({ message: "Product variants must contain at least one variant." }),
    inventory: InventorySchema.refine(data => data.quantity >= 0, {
        message: "Inventory quantity must be non-negative.",
        path: ["quantity"]
    })
});
//zod order id validatyion.
export const zodProductidValidator= z.string({message:"Valid Product id is required."}).length(24, { message: "Product ID must be exactly 24 characters long." })
export default productZodSchema;
