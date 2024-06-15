import { schemisterCodeobj } from "./academicsemister.constant";
import { TAcademicSemester } from "./academicsemister.interface";
import { academicSemesterModel } from "./accademicsemister.model";

const createSchemister=async(payload:TAcademicSemester)=>{

    // validating is the payload comming with propper schemister code.
   
    if(schemisterCodeobj[payload.name]!==payload.code){
        throw new Error("Schemister code is wrong!")
    }
    const result=await academicSemesterModel.create(payload)
    return result
}

// get all schemister.
const getAllSchemister=async()=>{
    const result=await academicSemesterModel.find()
    return result
}

// get one schemister with id.
const getOneSchemister=async (id:string)=>{
    const result=await academicSemesterModel.findById(id)
    return result
}

// update a schemister.
const updateOneSchemister=async(id:string,payload:TAcademicSemester)=>{
    if(payload.name&&payload.code&&schemisterCodeobj[payload.name]!==payload.code){
        throw new Error("invalid schemister id")
    }
    const result=await academicSemesterModel.findByIdAndUpdate(id,payload,{new:true})
    return result
}

const academicSemisterService={
    createSchemister,
    getAllSchemister,
    getOneSchemister,
    updateOneSchemister
}
export default academicSemisterService