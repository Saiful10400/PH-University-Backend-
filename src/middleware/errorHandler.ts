import { Request,Response,NextFunction } from "express"
import httpStatus from "http-status"




const globalErrHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
const message=err.message||"Something went wrong!"
const statusCode=err.statusCode|| httpStatus.INTERNAL_SERVER_ERROR
return res.status(statusCode).json({
    success:false,
    message,
    error:err
})
}

export default globalErrHandler