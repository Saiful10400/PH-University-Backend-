import express from "express";
import { StudentControllers } from "./student.controller";
import zodValidation from "../../middleware/zodvalidation";
import { stdZodValidation } from "./student.validation";

const router = express.Router();

router.get("/", StudentControllers.getAll);

router.get("/:id", StudentControllers.getOne);

router.patch(
  "/:id",
  zodValidation(stdZodValidation.update),
  StudentControllers.updateOne
);

router.delete("/:id", StudentControllers.deleteOne);

export const StudentRoutes = router;
