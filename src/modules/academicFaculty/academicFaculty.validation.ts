import { z } from "zod";

const  createAcademicFacultyValidationZodSchema=z.object({
    name:z.string({invalid_type_error:"Faculty Name mustbe a string."})
})
const  updateAcademicFacultyValidationZodSchema=z.object({
    name:z.string({invalid_type_error:"Faculty Name mustbe a string."})
})

const FacultyZodValidation={
    createAcademicFacultyValidationZodSchema,
    updateAcademicFacultyValidationZodSchema
}
export default FacultyZodValidation