import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentModel } from "./academicDepartment.model";



//1. create a academic faculty into db.
const createOne=async(payload:TAcademicDepartment)=>{
    const result=await academicDepartmentModel.create(payload)
    return result
}

//2.get all academic facults form db.
const getAll=async()=>{
    const result=await academicDepartmentModel.find().populate("academicFaculty")
    return result
}

//3.get single academic faculty form db.
const getOne=async(id:string)=>{
    const result=await academicDepartmentModel.findById(id).populate("academicFaculty")
    return result
}

//4. update one academic faculty
const updateOne=async(id:string,payload:Partial<TAcademicDepartment>)=>{
    const result=await academicDepartmentModel.findByIdAndUpdate(id,payload,{new:true})
    return result
}


const academicDepartmentService={
    createOne,
    getAll,
    getOne,
    updateOne
}
export default academicDepartmentService