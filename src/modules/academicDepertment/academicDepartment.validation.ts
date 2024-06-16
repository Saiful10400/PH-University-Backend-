import { z } from "zod";

const  create=z.object({
    name:z.string({invalid_type_error:"Department Name mustbe a string."}),
    academicFaculty:z.string({invalid_type_error:"mustbe a string",required_error:"faculty is requried."})
})
const  update=z.object({
    name:z.string({invalid_type_error:"Department Name must be a string."}),
    academicFaculty:z.string().optional()
})

const DepartmentZodValidation={
    create,
    update,
}
export default DepartmentZodValidation