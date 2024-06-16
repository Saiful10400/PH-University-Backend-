import httpStatus from "http-status"
import { productModel } from "./product.model"
import { productType } from "./type.product"
import { Request } from "express"
import appError from "../../handleError/appErrorHandler"

// 1.create a product.
const serviceCreateProduct=async(data:productType)=>{
    const result=await productModel.create(data)
    return result
}

// 2. get all products or products that match with keyword.
const serviceGetAllProducts=async(request:Request)=>{

    //checking is this comming with query paramitere.
    const{searchTerm}=request.query
    const queryObjLength=Object.keys(request.query).length


    if(typeof(searchTerm)==="string"){
        // coming with query paramitere.
        const keyReg=new RegExp(searchTerm,"i")

        const result=await productModel.find({$or:[
            {name:{$regex:keyReg}},
            {description:{$regex:keyReg}},
            {tags:{$regex:keyReg}}
        ]})
        

        return {message:`Products matching search term '${searchTerm}' fetched successfully!`
    ,data:result}
    }
     else if(queryObjLength===0){
        // not coming with query paramitre
        const result=await productModel.find()
        return {message:`Product fetched successfully!`
        ,data:result}
    } 
    else{
        throw new appError(httpStatus.BAD_REQUEST,"Incorrect query parameter.")
      }
    
}
/// 2.1 get all products with matching keyword.
// const serviceGetAllProductsWithKeyword=async(keyword:string)=>{
//     const result=await productModel.find({tags:{$all:[new RegExp(keyword,"i")]}})
//     return result
// }

// 3. get a product by id.
const serviceGetAProduct=async(id:string)=>{
   
    const result=await productModel.findById(id)
    return result
}

// 4. update a product by id.
const serviceUpdateAProduct=async(id:string,data:productType)=>{
    const result=await productModel.findOneAndUpdate({_id:id},data,{new:true})
    return result
}

// 5. delete a product by id.
const serviceDeleteAProduct=async(id:string)=>{
    const result=await productModel.deleteOne({_id:id})
    return result
}

export const productService={
createOne:serviceCreateProduct,
getAll:serviceGetAllProducts,
getOne:serviceGetAProduct,
updateOne:serviceUpdateAProduct,
deleteOne:serviceDeleteAProduct,
}