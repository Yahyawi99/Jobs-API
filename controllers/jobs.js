const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllJobs = async (req, res) => {
  const { userId } = req.user;

  const jobs = await Job.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getSingleJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new CustomError.NotFoundError(`No job with id : ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { userId } = req.user;

  const job = await Job.create({ ...req.body, createdBy: userId });

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  const { userId } = req.user;

  if (company === "" || position === "") {
    throw new CustomError.BadRequestError(
      "Please provide company and position values"
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new CustomError.NotFoundError(`No job with id : ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOneAndDelete({ _id: jobId });

  if (!job) {
    throw new CustomError.NotFoundError(`No job with id : ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Job deleted successfully!" });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
