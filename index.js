const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const helmet = require("helmet");
const dotenv = require("dotenv");
const authRouter = require("./routes/author");
const bookRouter = require("./routes/book");
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

mongoose.connect(process.env.MONGO_DB_SECRET_KEY);

//ROUTES
app.use("/v1/author", authRouter);
app.use("/v1/book", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

app.get("/hello-world", (request, response) => {
  response.status(200).json({ res: "Hello World" });
});
