import { z } from "zod";

const  create=z.object({
    name:z.string({invalid_type_error:"Faculty Name mustbe a string."})
})
const  update=z.object({
    name:z.string({invalid_type_error:"Faculty Name mustbe a string."})
})

const FacultyZodValidation={
    create,
    update
}
export default FacultyZodValidation