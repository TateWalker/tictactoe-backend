import { app } from "./app";
import * as http from "http";
import socketServer from "./socket";
import https from "https";
import fs from "fs";
import cors from "cors";
var debug = require("debug")("socketio-server:server");

const port = process.env.PORT || 3001;

const httpServer = http.createServer(app);
httpServer.listen(port, () =>
  console.log(`HTTPS server listening on port:${port}`)
);

let server = http.createServer(app);
server.listen(6969);
server.on("error", onError);
server.on("listening", onListening);
const io = socketServer(server);
function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr: any = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);

  console.log("Server Running on Port: ", addr?.port);
}

export { io };
