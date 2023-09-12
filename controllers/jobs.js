const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllJobs = async (req, res) => {
  res.send("register");
};

const getSingleJob = async (req, res) => {
  res.send("login");
};

const createJob = async (req, res) => {
  const { userId } = req.user;

  const job = await Job.create({ ...req.body, createdBy: userId });

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  res.send("login");
};

const deleteJob = async (req, res) => {
  res.send("login");
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
