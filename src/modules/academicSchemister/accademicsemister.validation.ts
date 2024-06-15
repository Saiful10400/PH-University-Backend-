import { string, z } from "zod";
import { TAcademicSemester } from "./academicsemister.interface";
import schemisterconstant from "./academicsemister.constant";

export const accademicValidationZodSchema = z.object({
  name: z.enum(schemisterconstant.schemisterName as [string, ...string[]]),

  code: z.enum(schemisterconstant.schemisterCode as [string, ...string[]]),

  endMonth: z.enum(schemisterconstant.month as [string, ...string[]]),

  startMonth: z.enum(schemisterconstant.month as [string, ...string[]]),

  year: z.string(),
});


export default accademicValidationZodSchema