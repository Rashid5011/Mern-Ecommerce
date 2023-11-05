const configDotenv = require("dotenv");
const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/db");
// config
configDotenv.config({ path: "./config/config.env" });
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
