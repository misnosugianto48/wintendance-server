import positionsService from "../service/positionsService.mjs";

const postPosition = async (req, res, next) => {
  try {
    const payload = req.body;

    res.status(201).json({
      status: "created",
      message: "position has been created successfully",
      data: await positionsService.addPositions(payload),
    });
  } catch (e) {
    next(e);
  }
};

const getPositions = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      data: await positionsService.getPositions(),
    });
  } catch (e) {
    next(e);
  }
};

const getPositionById = async (req, res, next) => {
  try {
    const positionId = Number(req.params.positionId);

    res.status(200).json({
      status: "success",
      data: await positionsService.getPositionById(positionId),
    });
  } catch (e) {
    next(e);
  }
};

const patchPositionById = async (req, res, next) => {
  try {
    const positionId = Number(req.params.positionId);
    const payload = req.body;

    res.status(200).json({
      status: "success",
      message: "position has been updated",
      data: await positionsService.editPositionById(positionId, payload),
    });
  } catch (e) {
    next(e);
  }
};

const deletePositionById = async (req, res, next) => {
  try {
    const positionId = Number(req.params.positionId);
    await positionsService.deletePositionById(positionId);

    res.status(200).json({
      status: "success",
      message: "position has been deleted",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  postPosition,
  getPositions,
  getPositionById,
  patchPositionById,
  deletePositionById,
};
