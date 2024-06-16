import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import academicSemisterService from "./academicsemister.service";
import sendRes from "../../utils/sendRes";
import httpStatus from "http-status";

const createSchemister = catchAsync(async (req: Request, res: Response) => {

  const result = await academicSemisterService.createSchemister(req.body);
  sendRes(res, {
    data: result,
    message: "academis schemister is created successfully",
    status: httpStatus.OK,
    success: true,
  });
});

// get all schemister.
const getAllSchemister=catchAsync(async (req: Request, res: Response)=>{
  const result=await academicSemisterService.getAllSchemister()
  sendRes(res, {
      data: result,
      message: "academis schemisters are fetched successfully",
      status: httpStatus.OK,
      success: true,
    })

})

// get one schemister.
const getOneSchemister=catchAsync(async (req: Request, res: Response)=>{
  const{id}=req.params
  const result=await academicSemisterService.getOneSchemister(id as string)
  sendRes(res, {
    data: result,
    message: "Single academis schemister fetched successfully",
    status: httpStatus.OK,
    success: true,
  })
})

// update one schema.
const updateOneSchemister=catchAsync(async (req: Request, res: Response)=>{
  const data=req.body
  const {id}=req.params
  
  const result=await academicSemisterService.updateOneSchemister(id as string,data)
  sendRes(res, {
    data: result,
    message: "academis schemister is updated successfully",
    status: httpStatus.OK,
    success: true,
  })

})

const schemisterController = {
  createSchemister, getAllSchemister,getOneSchemister,updateOneSchemister
};

export default schemisterController;




