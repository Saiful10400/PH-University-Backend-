import { z } from "zod";

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string().regex(/^\d{10}$/),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string().regex(/^\d{10}$/),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string().regex(/^\d{10}$/),
  address: z.string(),
});

const studentSchema = z.object({
  name: z.object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
  }),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  email: z.string().email(),
  contactNo: z.string().regex(/^\d{10}$/),
  emergencyContactNo: z.string().regex(/^\d{10}$/),
  bloogGroup: z.string().regex(/^(A|B|AB|O)[+-]$/),
  presentAddress: z.string(),
  permanentAddres: z.string(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().url(),
});

const stdMiddlewareVal = z.object({
  password: z.string().min(6).optional(),
  student: studentSchema,
});

const stdZodValSchema={
stdMiddlewareVal
}

export default stdZodValSchema
