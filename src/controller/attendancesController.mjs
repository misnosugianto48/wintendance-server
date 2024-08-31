import attendancesService from '../service/attendancesService.mjs';

const postAttendance = async (req, res, next) => {
  try {
    const userId = req.userId;
    const payload = req.body;
    const result = await attendancesService.addAttendance(userId, payload);

    res.status(201).json({
      status: 'created',
      message: 'checkin has been created successfully',
      data: {
        result,
        checkIn: result.check_in.toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }),
      },
    });
  } catch (e) {
    next(e);
  }
};

const patchAttendance = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    const result = await attendancesService.editCheckoutAttendance(employeeId);

    res.status(200).json({
      status: 'success',
      message: 'checkout has been added successfully',
      data: {
        result,
        checkIn: result.check_in.toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }),
        checkOut: result.check_out.toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }),
      },
    });
  } catch (e) {
    next(e);
  }
};

export default { postAttendance, patchAttendance };
