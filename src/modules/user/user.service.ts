

//1. create a new student.

import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser, TnewUser } from "./user.interface";
import { UserModel } from "./user.model";

const CreateAStudent=async(password:string,stdData:TStudent)=>{

    const userDAta:Partial<TUser> ={}
    userDAta.password=password||config.defPassword as string
    userDAta.id="2024sem10001"
    userDAta.role="student"
    const result=await UserModel.create(userDAta)
    
    // if success then create a new student.
    if(Object.keys(result).length){
        stdData.id=result.id
        stdData.user=result._id
    
        // create a new student into db.
        const stdResult=await StudentModel.create(stdData)
      
        return stdResult
    }
    return result
}
   



// let's export the functions.

const userService={
    CreateAStudent
}

export default userService