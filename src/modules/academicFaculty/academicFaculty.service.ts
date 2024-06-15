import { TAcademicFaculty } from "./academicFaculty.interface";
import { academicFacultyModel } from "./academicFaculty.model";


//1. create a academic faculty into db.
const createOne=async(payload:TAcademicFaculty)=>{
    const result=await academicFacultyModel.create(payload)
    return result
}

//2.get all academic facults form db.
const getAll=async()=>{
    const result=await academicFacultyModel.find()
    return result
}

//3.get single academic faculty form db.
const getOne=async(id:string)=>{
    const result=await academicFacultyModel.findById(id)
    return result
}

//4. update one academic faculty
const updateOne=async(id:string,payload:Partial<TAcademicFaculty>)=>{
    const result=await academicFacultyModel.findByIdAndUpdate(id,payload)
    return result
}


const academicFacultyService={
    createOne,
    getAll,
    getOne,
    updateOne
}
export default academicFacultyService