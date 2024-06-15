// get a student with :id.

import { StudentModel } from "./student.model"

const GetAStudent=async (id:string)=>{
    const result=await StudentModel.findById({_id:id})
    return result
}

const stdService={
    GetAStudent
}

export default stdService