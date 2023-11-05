const express = require("express");
const products = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const user = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);

module.exports = app;
