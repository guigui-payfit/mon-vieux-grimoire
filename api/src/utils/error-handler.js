const http = require("http");

const {
  getServerAddressIndication,
} = require("./get-server-address-indication");

/**
 * @param {*} apiPort - API port
 * @param {*} error - error from API
 * @param {http.Server} server - HTTP server hosting running API
 */
exports.errorHandler = (apiPort, error, server) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const serverAddressIndication = getServerAddressIndication(apiPort, server);

  switch (error.code) {
    case "EACCES":
      console.error(`${serverAddressIndication} requires elevated privileges.`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${serverAddressIndication} is already in use.`);
      process.exit(1);
    default:
      throw error;
  }
};
