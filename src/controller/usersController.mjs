import usersService from "../service/usersService.mjs";

const createAdmin = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await usersService.createUser(payload);

    res.status(201).json({
      status: "created",
      message: "username admin has been created succefully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const postUsers = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await usersService.createUser(payload);

    res.status(201).json({
      status: "created",
      message: "user has been created successfully",
      data: result,
    });
    // res.send(JSON.stringify(req.headers));
  } catch (e) {
    next(e);
  }
};

const patchUsers = async (req, res, next) => {
  try {
    const paylaod = req.body;
    const userId = req.params.userId;

    const result = await usersService.editUsername(paylaod, userId);
    res.status(200).json({
      status: "success",
      message: "username has been updated successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { createAdmin, postUsers, patchUsers };
