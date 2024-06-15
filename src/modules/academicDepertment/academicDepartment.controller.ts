import { Request,Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendRes from "../../utils/sendRes";
import httpStatus from "http-status";
import academicDepartmentService from "./academicDepartment.service";

// create one
const createOne=catchAsync(async(req:Request,res:Response)=>{
    const result=await academicDepartmentService.createOne(req.body) 
    
    sendRes(res, {
        data: result,
        message: "academis faculty is created successfully",
        status: httpStatus.OK,
        success: true,
      });
    
})

// get all.
const getAll=catchAsync(async(req:Request,res:Response)=>{
    const result=await academicDepartmentService.getAll()
    
    sendRes(res, {
        data: result,
        message: "academis facultys fetched successfully",
        status: httpStatus.OK,
        success: true,
      });
    
})

// get one.
const getOne=catchAsync(async(req:Request,res:Response)=>{
    const {facultyId}=req.params
    const result=await academicDepartmentService.getOne(facultyId)
    
    sendRes(res, {
        data: result,
        message: "academis faculty fetched successfully",
        status: httpStatus.OK,
        success: true,
      });
    
})

// update one
const updateOne=catchAsync(async(req:Request,res:Response)=>{
    const{facultyId}=req.params
    const result=await academicDepartmentService.updateOne(facultyId,req.body) 
    
    sendRes(res, {
        data: result,
        message: "academis faculty updated successfully",
        status: httpStatus.OK,
        success: true,
      });
    
})


const academicDepartmentController={
    createOne,
    getAll,
    updateOne,
    getOne
}
export default academicDepartmentController