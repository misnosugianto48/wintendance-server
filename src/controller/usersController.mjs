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

export default { createAdmin };
