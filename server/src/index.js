const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const consola = require("consola");
const volleyball = require("volleyball");
const WebResponse = require("./utils/WebResponse");
require("dotenv").config();
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(morgan("dev"));
app.use(volleyball);

io.on("connection", (socket) => {
  consola.success("Client Connection", socket.id);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/v1", require("./routes"));

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  return WebResponse(res, res.statusCode, err.message, err.stack);
}

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => consola.success(`SERVER READY IN PORT ${PORT}`));
