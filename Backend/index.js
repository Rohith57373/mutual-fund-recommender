const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Replace with your frontend origins
    credentials: true,
  })
);

app.use(express.json());
app.use("/level", mainRouter);

app.listen(3002);
