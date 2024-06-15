import { Request, Response } from "express";
import productZodSchema, { zodProductidValidator } from "./product.zod.schema";
import { productService } from "./product.service";
import { productSchema } from "./product.model";
import { productType } from "./type.product";
// 1. create a product.
const controllCreateAProduct = async(req: Request, res: Response) => {
  try {
    const productData = req.body;
    
    // zod validate data.
    const zodValidatedData=productZodSchema.parse(productData)
    const result=await productService.createOne(zodValidatedData)
    res.status(200).json({
        success:true,
        message:"Product created successfully!",
        data:result
    })

    

  } catch (err:any) {
    const issue:Array<string> =[]
   err?.issues?.map((item:any)=>issue.push(item.message))

    res.status(500).json({
        success:false,
        message:"your provided data has some issue.",
        issue:issue as Array<string>
       
    })

  }
};

// 2. get all product.
const controllGetAllProduct=async(req:Request,res:Response)=>{
    try{
        
        const result=await productService.getAll(req)
        res.status(200).json({
                    success:true,
                    message:result.data.length>=1?result.message:`No data found.`,
                    data:result.data.length>=1?result.data:null
                })
    }catch(err){
        if(err instanceof Error){
            res.status(500).json({
                success:false,
                message:err.message
               
            })
        }
    }
}

// 3. get a product with id.
const controllGetAProduct=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const zodvalidatedId=zodProductidValidator.parse(id)
       
        const result=await productService.getOne(zodvalidatedId as string)
        res.status(200).json({
            success:true,
            message:"Product fetched successfully!",
            data:result
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Invalid order id"
           
        })
    }
}

// 4. update a product.
const controllUpdateAProduct=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const data=req.body
         
        const result=await productService.updateOne(id,data)
        if(!result){
            res.status(500).json({
                success:false,
                message:"incorrect query parameter"
               
            })
            
        }
       else{
        res.status(200).json({
            success:true,
            message:"Product updated successfully!",
            data:result
        })
    }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err
           
        })
    }
}

// 5. delete a product.
const controllDeleteAProduct=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const result=await productService.deleteOne(id)
        res.status(200).json({
            success:true,
            message:"Product deleted successfully!",
            data:null
        })


    } catch(err){
        res.status(500).json({
            success:false,
            message:err
           
        })
    }
}

export const productController = {
  createOne: controllCreateAProduct,
  getAll:controllGetAllProduct,
  getOne:controllGetAProduct,
  updateOne:controllUpdateAProduct,
  deleteOne:controllDeleteAProduct
};
