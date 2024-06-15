import express from "express";
import { Request, Response } from "express";
import globalErrHandler from "./middleware/errorHandler";
import httpStatus from "http-status";
import router from "./modules/routers";

// declare app variable.
const app = express();
app.use(express.json());

// routes
app.use("/api/v1/", router);

//  global error handler middleware.
app.use(globalErrHandler);

// handle 404 route.
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api route is invalid.",
    error: null,
  });
});

// export app.
export default app;
