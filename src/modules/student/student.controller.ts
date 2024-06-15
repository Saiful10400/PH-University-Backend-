import { Request,Response } from "express";
// get a studetn with :id.

import catchAsync from "../../utils/catchAsync";
import stdService from "./student.service";
import sendRes from "../../utils/sendRes";
import httpStatus from "http-status";

const getAStudent=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params
    const result=await stdService.GetAStudent(id)
    sendRes(res,{data:result,status:httpStatus.OK,message:"successfully fetched std data",success:true})
})


const stdController={
    getAStudent
}

export default stdController