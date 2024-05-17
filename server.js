const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const passport = require("passport");

const port = process.env.PORT||5000;
const bodyParser = require("body-parser");

// const handlebars = require("express-handlebars");
//cross origin
const cors = require("cors");
// const morgan = require("morgan");
// const { extname } = require("path");

//su dung morgan
//HTTP logger
// app.use(morgan("combined"));

// import thu vien path
// const path = require("path");
const router = require("./src/routes");
const errorHandler = require("./src/middlewares/error-handler");

// template engine
// engine đặt tên là handlebars (num1) và sử dụng
// API thư viện gọi đến từ handlebars() đã tạo ở trên
// app.engine("hbs", handlebars.engine({ defaultLayout: "main",extname: ".hbs"}));

//cấu hình static file
// app.use(express.static(path.join(__dirname, "public")));
// configure đuổi file (extname: ".hbs") 
//sử dụng lại engine gọi ra theo tên
// mặc định là 
// app.set("view engine", "hbs");
// // trỏ đến thư mục views trong folder resources
// app.set("views", path.join(__dirname,"src\\resources\\views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
// initialize passport with express
require('./src/_helpers/passport_config')(passport);
app.use(passport.initialize());

//cross origin
app.use(cors());
//middleware error handler
app.use(errorHandler);
// cổng
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})