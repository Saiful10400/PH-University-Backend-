import express from "express"
import { orderController } from "./order.controller"
export const orderRouter=express.Router()

//1. create a order
orderRouter.post("/",orderController.createOrder)

//2. get all order or get a order with query parametere.
orderRouter.get("/",orderController.getOrder)