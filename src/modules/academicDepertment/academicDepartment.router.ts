import Express  from "express";
import zodValidation from "../../middleware/zodvalidation";
import academicDepartmentController from "./academicDepartment.controller";
import DepartmentZodValidation from "./academicDepartment.validation";

const router=Express.Router()

// 1. create one
router.post("/create",zodValidation(DepartmentZodValidation.create),academicDepartmentController.createOne)

//2. get all
router.get("/",academicDepartmentController.getAll)

//3. get one by id.
router.get("/:departmentId",academicDepartmentController.getOne)

// 4. updateOne
router.patch("/:departmentId",zodValidation(DepartmentZodValidation.update),academicDepartmentController.updateOne)


const departmentRoute=router
export default departmentRoute