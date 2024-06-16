
import httpStatus from "http-status"
import { productModel } from "../product/product.model"
import { orderModel } from "./order.model"
import { orderZodEmailSchema } from "./order.zod.schema"
import { orderType } from "./type.order"
import { Request } from "express"
import appError from "../../handleError/appErrorHandler"

// # Inventory status checking and updating functions.

// #1. inventory check
const serviceInventoryCheck=async(id:string):Promise<{quantity:number,inStock:boolean}| null> =>{
    const result=await productModel.findById({_id:id}).select({inventory:1})
    if (!result){
        return null
    } else{
        return result.inventory
    }
}

//#2. update the inventory.
const serviceInventoryUpdate=async(id:string,quantity:number)=>{
    
    const willUPdate=quantity===0?{$set:{"inventory.quantity":quantity,"inventory.inStock":false}}:{$set:{"inventory.quantity":quantity}}
    const result=await productModel.findOneAndUpdate({_id:id},willUPdate,{new:true})
    return result
}


// ## order managing functions.

//##1. create a order.
const serviceCreateAOrder=async (data:orderType)=>{
    const result=await orderModel.create(data)
    return result
}

//##2. get all orders or a single order with query parameter.
const serviceGetAllOrders=async (requst:Request)=>{


      // checking is this request commitn with query parametere.

      const{email}=requst.query
      const queryObjLength=Object.keys(requst.query).length
     
     

      if(email){
        //validateinn email.
        const zodValidatedEmail=orderZodEmailSchema.parse(email)
          //this one is comming with query parametere.
          const result=await orderModel.find({email:zodValidatedEmail})
         if(result.length>0){
            return {success:true,message:"Orders fetched successfully for user email!",data:result}
         } else{
            return {success:false}
         }
      } else if(queryObjLength===0){
          //not comming with query parametere.
          const result=await orderModel.find()
          if(result.length>0){
            return {success:true,message:"Orders fetched successfully!",data:result}
          } else{
            return {success:false}
          }
  
      } else{
        throw new appError(httpStatus.BAD_REQUEST,"Incorrect query parameter.")
      }
  


    
}





export const orderService={
    inventoryStatus:serviceInventoryCheck,
    updateQuantity:serviceInventoryUpdate,
    createOrder:serviceCreateAOrder,
    getOrder:serviceGetAllOrders
}