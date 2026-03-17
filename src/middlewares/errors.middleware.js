export const errorHandler = (error, req, res, next) => {
  
  if(req.logger) {
    req.logger.error(`Error capturado: ${error.message}`);
  } else {
    console.error("Error capturado:", error.message);
  }

  res.status(error.statusCode ||500).json({
    status: "error",
    error: error.message || "Internal Server Error",
    cause: error.cause || null
  });

};