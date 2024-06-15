import {NextFunction, Request, Response } from "express"
import userService from "./user.service"
import sendRes from "../../utils/sendRes"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
//1. create a student.



const createAStudent=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
   
     const{password,student}=req.body
    
     const result=await userService.CreateAStudent(password,student)
    return sendRes(res,{
         data:result,
         status:httpStatus.OK,
         success:true,
         message:"student is created successfully."
     })
     
     
   
 
 })






// export the functions
const userController={
    createAStudent
}
export default userController