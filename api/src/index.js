const dotenv = require("dotenv");
const http = require("http");

const app = require("./app");
const { errorHandler } = require("./utils/error-handler");
const {
  getServerAddressIndication,
} = require("./utils/get-server-address-indication");
const { normalizePort } = require("./utils/normalize-port");

dotenv.config();

const apiPort = normalizePort(process.env["API_PORT"]);
app.set("port", apiPort);

const server = http.createServer(app);
server.on("error", (error) => {
  errorHandler(apiPort, error, server);
});
server.on("listening", () => {
  console.log(
    "API listening on " + getServerAddressIndication(apiPort, server)
  );
});
server.listen(apiPort);
