import express from "express"
import schemisterController from "./academicsemister.controller"
import zodValidation from "../../middleware/zodvalidation"
import accademicValidationZodSchema from "./accademicsemister.validation"

const schemisterRoute=express.Router()



schemisterRoute.post("/create",zodValidation(accademicValidationZodSchema),schemisterController.createSchemister)

// get all schemister
schemisterRoute.get("/",schemisterController.getAllSchemister)

// get one shcemister with :id
schemisterRoute.get("/:id",schemisterController.getOneSchemister)

// update one schemister.
schemisterRoute.patch("/:id",zodValidation(accademicValidationZodSchema),schemisterController.updateOneSchemister)

export default schemisterRoute