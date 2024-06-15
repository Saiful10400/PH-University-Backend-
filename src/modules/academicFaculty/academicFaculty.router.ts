import Express  from "express";
import academicFacultyController from "./academicFaculty.controller";
import zodValidation from "../../middleware/zodvalidation";
import academicFacultyValidationZodSchema from "./academicFaculty.validation";
import FacultyZodValidation from "./academicFaculty.validation";

const router=Express.Router()

// 1. create one
router.post("/create",zodValidation(FacultyZodValidation.createAcademicFacultyValidationZodSchema),academicFacultyController.createOne)

//2. get all
router.get("/",academicFacultyController.getAll)

//3. get one by id.
router.get("/:facultyId",academicFacultyController.getOne)

// 4. updateOne
router.patch("/:facultyId",zodValidation(FacultyZodValidation.updateAcademicFacultyValidationZodSchema),academicFacultyController.updateOne)


const facultyRouter=router
export default facultyRouter