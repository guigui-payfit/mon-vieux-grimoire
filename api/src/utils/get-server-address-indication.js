const http = require("http");

/**
 * @param {*} apiPort - API port
 * @param {http.Server} server - HTTP server hosting running API
 * @returns {string} an indication on the server address (pipe or port)
 */
exports.getServerAddressIndication = (apiPort, server) => {
  const address = server.address();
  return typeof address === "string" ? `pipe ${address}` : `port ${apiPort}`;
};
