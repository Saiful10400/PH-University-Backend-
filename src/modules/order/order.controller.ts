import { Request, Response } from "express";
import { orderZodSchema } from "./order.zod.schema";
import { orderService } from "./order.service";
// 1. create a order request.
const controllCreateAOrder=async (req:Request,res:Response)=>{
    try{
        const orderData=req.body
        // zod validataion.
        const zodValidatedData=orderZodSchema.parse(orderData)
        const {productId}=zodValidatedData
        //step1. check inventory status.
        const inventory=await orderService.inventoryStatus(productId)
        if(inventory){
            if(inventory.quantity>=zodValidatedData.quantity && inventory.inStock){
                //create a order and update the inventory.

                // step1. create the order.
                const orderCreatedResult=await orderService.createOrder(zodValidatedData) 
                // step2. update the inventory.
                const quantity=inventory.quantity-zodValidatedData.quantity
                const inventoryUpdate=await orderService.updateQuantity(productId,quantity)
                res.status(200).json({
                    success:true,
                    message:"Order created successfully!",
                    data:orderCreatedResult
                })
            }else if(zodValidatedData.quantity===0){
                res.status(500).json({
                    success:false,
                    message:"You can't create a order with 0 quantity."
                })
               return
            }
            else if(!inventory.inStock){
                res.status(500).json({
                    success:false,
                    message:"Product is out of stock."
                })
               return
                
            }
             else if(inventory.quantity<zodValidatedData.quantity){
                res.status(500).json({
                    success:false,
                    message:"Insufficient quantity available in inventory."
                })
               return
                
            }
        }else{
            res.status(500).json({
                success:false,
                message:"invalid Product id."
            })
           return
           
        }
    }catch (err:any) {
        const issue:Array<string> =[]
       err?.issues?.map((item:any)=>issue.push(item.message))
    
        res.status(500).json({
            success:false,
            message:"your provided data has some issue.",
            issue:issue as Array<string>
           
        })
    
      }
}

//2. get all order or get one order with query parametere.
const controllGetOrder=async  (req:Request,res:Response)=>{
    try{
        // call the service funciton.
        const result=await orderService.getOrder(req)
        if(result.success){
            res.status(200).json({
                ...result
            })

        } else{
            res.status(500).json({
                success:false,
                message:"Order not found"
            })
        }
        

    } catch(err){
        if(err instanceof Error){
            res.status(500).json({
                success:false,
                message:"invalid query parameter."
            })
        }
        
    }
}



export const orderController={
    createOrder:controllCreateAOrder,
    getOrder:controllGetOrder
}