import { nanoid } from 'nanoid';
import { primaClient } from '../apps/database.mjs';
import { NotFoundError } from '../exceptions/NotFoundError.mjs';
import leaveRequestsValidator from '../validator/leaveRequestsValidator.mjs';
import { validate } from '../validator/validate.mjs';
import { AuthorizationError } from '../exceptions/AuthorizationError.mjs';

const addLeaveRequest = async (userId, payload) => {
  const leaveRequest = validate(
    leaveRequestsValidator.addLeaveRequestValidator,
    payload
  );

  const employee = await primaClient.employee.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      user: true,
    },
  });

  if (!employee) {
    throw new NotFoundError(
      'Employee not found or does not belong to the user'
    );
  }

  const newData = {
    id: `leaves-${nanoid(16)}`,
    employee_id: employee.id,
    leave_start_date: leaveRequest.leaveStartDate,
    leave_end_date: leaveRequest.leaveEndDate,
    reason: leaveRequest.reason,
    number_of_days_leave: leaveRequest.numberOfLeave,
  };

  return await primaClient.leave_Requet.create({
    data: newData,
    select: {
      id: true,
    },
  });
};

const editLeaveRequest = async (userId, leaveId, payload) => {
  const leaveRequest = validate(
    leaveRequestsValidator.editLeaveRequestValidator,
    payload
  );

  const leaveCount = await primaClient.leave_Requet.findUnique({
    where: {
      id: leaveId,
    },
    include: {
      employee: true,
    },
  });

  if (leaveCount.employee.user_id !== userId) {
    throw new AuthorizationError('restrict resource');
  }

  if (!leaveCount) {
    throw new NotFoundError('leaves not found');
  }

  const data = {};

  if (leaveRequest.leaveStartDate) {
    data.leave_start_date = leaveRequest.leaveStartDate;
  }

  if (leaveRequest.leaveEndDate) {
    data.leave_end_date = leaveRequest.leaveEndDate;
  }

  if (leaveRequest.reason) {
    data.reason = leaveRequest.reason;
  }

  if (leaveRequest.numberOfLeave) {
    data.number_of_days_leave = leaveRequest.numberOfLeave;
  }

  return await primaClient.leave_Requet.update({
    where: {
      id: leaveId,
    },
    data: data,
    select: {
      id: true,
    },
  });
};

export default { addLeaveRequest, editLeaveRequest };
