const { ApiError } = require("./ApiError");
const { ApiRes } = require("./ApiRes");

const globalErrorHandler = (error, req, res, next) => {
  if (!(error instanceof ApiError)) {
    return res.status(500).json(
      new ApiRes(
        500,
        null,
        error._message ?? error.message ?? "Internal Server Error"
      )
    );
  }

  res
    .status(error.statusCode)
    .json(new ApiRes(error.statusCode, error.data, error.message));
};

module.exports = { globalErrorHandler };
