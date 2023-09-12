const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createToken();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomErrors.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomErrors.UnauthenticatedError(
      `No user with email : ${email}`
    );
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new CustomErrors.UnauthenticatedError(`Invalid Credentials!`);
  }

  const token = user.createToken();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
