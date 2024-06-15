import { Response } from "express";

interface Tresponse <T>{
    message:string,
    status:number,
    data:T,
    success:boolean
}
const sendRes=<T>(res:Response,data:Tresponse<T>)=>{
return res.status(data.status).json({
    status:data.status,
    message:data.message,
    data:data.data
})
}


export default sendRes