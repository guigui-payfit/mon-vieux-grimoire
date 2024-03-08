/**
 * @param {*} portValue - API port (given from an environment variable for instance)
 * @returns {*} anormalized version of API port
 */
exports.normalizePort = (portValue) => {
  const port = parseInt(portValue, 10);

  if (isNaN(port)) {
    return portValue;
  }
  if (port >= 0) {
    return port;
  }
  throw new Error(`Invalid port value: ${portValue}`);
};
