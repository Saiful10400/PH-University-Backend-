import { Schema, model } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';
import appError from '../../handleError/appErrorHandler';
import httpStatus from 'http-status';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent>({
  id: { type: String},
  user:{type:Schema.Types.ObjectId,required:[true,"User id is required"],unique:true,ref:"User"},
  name: userNameSchema,
  gender: {type:String,enum:['male', 'female']},
  dateOfBirth: { type: Date },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {type:String,enum:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']},
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuradianSchema,
  academicDepartment:{type:Schema.Types.ObjectId,ref:"academicDepartment"},
  admissionSemester:{type:Schema.Types.ObjectId,ref:"AcademicSemester"},
  profileImg: { type: String },
  
});

studentSchema.pre("save",async function(next){
  console.log("prehock midware.")
  const isStudentExist:any=await StudentModel.findOne({email:this.email})
  if(isStudentExist){
    throw new appError(httpStatus.BAD_GATEWAY,"This student data is existing.")
    
  } 
  next()
})

export const StudentModel = model<TStudent>('Student', studentSchema);
 