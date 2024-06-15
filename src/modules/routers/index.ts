import { Router } from "express";
import userRoute from "../user/user.router";
import schemisterRoute from "../academicSchemister/academicsemister.router";
import facultyRouter from "../academicFaculty/academicFaculty.router";

const router = Router();

type Trouter=Array<{path:string,func:any}>

const routes:Trouter = [
  {
    path: "/user",
    func: userRoute,
  },
  {
    path:"/schemister",
    func:schemisterRoute
  },
  {
    path:"/faculty",
    func:facultyRouter
  }
];


routes.forEach((item) => router.use(item.path, item.func));

export default router;
  