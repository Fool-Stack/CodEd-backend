const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const app = express();
const http = require('https')
const socket = require('socket.io')
var morgan = require("morgan");

app.use(morgan("combined"));

app.set("trust proxy", 1);
const logResponseBody = require("./utils/logResponse");
//Require Atlas database URI from environment variables
const DBURI = process.env.DB_URI;
//Connect to MongoDB client using mongoose
mongoose
  .connect(DBURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });
mongoose.Promise = global.Promise;
//Use helmet to prevent common security vulnerabilities
app.use(helmet());
//Use body-parser to parse json body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logResponseBody);

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(cors());
app.get("/checkServer", (req, res) => {
  return res.status(200).json({
    message: "Server is up and running",
  });
});
app.use("/lesson", require("./api/routers/lesson.routes"));
app.use("/user", require("./api/routers/user.routes"));
app.use("/course", require("./api/routers/course.routes"));
//This function will give a 404 response if an undefined API endpoint is fired
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
const PORT = process.env.PORT || 3000;
//Start the server

// const httpServer = http.createServer(app);
// let server = httpServer.listen(process.env.PORT || 3000, () => {
// 	console.log(`Server running of ${PORT}`);
// });

// const io = socket(server);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// io.on('connection', socket => {
//   socket.on('join-room', (roomId, userId) => {
//     socket.join(roomId)
//     socket.to(roomId).broadcast.emit('user-connected', userId)

//     socket.on('disconnect', () => {
//       socket.to(roomId).broadcast.emit('user-disconnected', userId)
//     })
//   })
// })