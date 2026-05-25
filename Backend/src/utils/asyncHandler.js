const asyncHandler = (controller) => {
  return (req, res, next) => {
    Promise.resolve(controller(req, res,next)).catch((error) => next(error));
  };
};

module.exports = asyncHandler;
