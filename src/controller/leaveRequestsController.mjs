import leaveRequestsService from '../service/leaveRequestsService.mjs';

const postLeaveRequest = async (req, res, next) => {
  try {
    const userId = req.userId;
    const payload = req.body;
    const result = await leaveRequestsService.addLeaveRequest(userId, payload);

    res.status(201).json({
      status: 'created',
      message: 'request has been created successfully',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const patchLeaveRequest = async (req, res, next) => {
  try {
    const userId = req.userId;
    const leaveId = req.params.leaveId;
    const payload = req.body;
    const result = await leaveRequestsService.editLeaveRequest(
      userId,
      leaveId,
      payload
    );

    res.status(200).json({
      status: 'success',
      message: 'leaves has been updated successfully',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { postLeaveRequest, patchLeaveRequest };
