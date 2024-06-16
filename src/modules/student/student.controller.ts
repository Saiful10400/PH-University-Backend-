import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { StudentServices } from './student.service';
import sendRes from '../../utils/sendRes';

const getOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getOne(id);

  sendRes(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const getAll: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAll(req.query);

  sendRes(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data:result
  });
});

const updateOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateOne(id, student);
  console.log(result)
  sendRes(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteOne(id);

  sendRes(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAll,
  getOne,
  deleteOne,
  updateOne,
};
