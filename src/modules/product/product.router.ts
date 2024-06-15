import express from "express"
import { productController } from "./product.controller"

export const ProductRouter=express.Router()


// 1. create one product.
ProductRouter.post("/",productController.createOne)

// 2. get all products.
ProductRouter.get("/",productController.getAll)

// 3. get a product by id.
ProductRouter.get("/:id",productController.getOne)

// 4. update a product by id.
ProductRouter.put("/:id",productController.updateOne)

// 5. Delete a Product.
ProductRouter.delete("/:id",productController.deleteOne)

