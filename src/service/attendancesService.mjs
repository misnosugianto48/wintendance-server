import { nanoid } from 'nanoid';
import { primaClient } from '../apps/database.mjs';
import { NotFoundError } from '../exceptions/NotFoundError.mjs';

const addAttendance = async (userId, payload) => {
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

  // Mengatur jam kerja mulai pukul 8 pagi waktu UTC
  const workingHoursStartUTC = new Date();
  workingHoursStartUTC.setUTCHours(1, 0, 0, 0); // Menggunakan setUTCHours untuk waktu UTC

  // Mendapatkan waktu sekarang dalam UTC
  const nowUTC = new Date();

  // Membandingkan waktu sekarang dengan waktu mulai kerja
  const isEarly = nowUTC < workingHoursStartUTC;
  const isLate = nowUTC > workingHoursStartUTC;

  const status = isEarly ? 'EARLY' : isLate ? 'TOO_LATE' : 'PRESENT';

  return await primaClient.attendance.create({
    data: {
      id: `attend-${nanoid(16)}`,
      employee_id: employee.id,
      check_in: new Date(),
      attendance_status: status,
      work_type: payload.workType,
    },
    include: { employee: true },
  });
};

const editCheckoutAttendance = async (employeeId) => {
  // Find attendance using employeeId and check_out being null (optional pre-check)
  const potentialAttendance = await primaClient.attendance.findFirst({
    where: {
      employee_id: employeeId,
      check_out: null,
    },
  });

  // If no potential attendance found, throw an error
  if (!potentialAttendance) {
    throw new NotFoundError(
      'attendance not found or does not have any attendance yet'
    );
  }

  // Find attendance by its unique ID (guaranteed uniqueness)
  const attendance = await primaClient.attendance.findUnique({
    where: {
      id: potentialAttendance.id, // Use the ID from the pre-check
    },
  });

  // Update the attendance record with check_out time
  return await primaClient.attendance.update({
    where: {
      id: attendance.id,
    },
    data: {
      check_out: new Date(),
    },
    include: {
      employee: true,
    },
  });
};

export default { addAttendance, editCheckoutAttendance };
