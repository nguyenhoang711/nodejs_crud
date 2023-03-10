const express = require('express');
const handlebars = require ('express-handlebars');
// const morgan = require('morgan');
// const { extname } = require('path');
//import thu vien

const app = express();
const port = 3000;

//su dung morgan
//HTTP logger
// app.use(morgan('combined'));

// import thu vien path
const path = require('path');

//template engine
//engine đặt tên là handlebars (num1) và sử dụng
//API thư viện gọi đến từ handlebars() đã tạo ở trên
app.engine('hbs', handlebars.engine({ defaultLayout: 'main',extname: '.hbs'}));

//cấu hình static file
app.use(express.static(path.join(__dirname, 'public')));
// configure đuổi file (extname: '.hbs') 
//sử dụng lại engine gọi ra theo tên
// mặc định là 
app.set('view engine', 'hbs');
// trỏ đến thư mục views trong folder resources
app.set('views', path.join(__dirname,'resources\\views'));

console.log(path.join(__dirname,'resources\\views'));
// route: tuyến tạo đường link dẫn đến trang chủ
app.get('/', (req, res) => {
    res.render('home');
})

//thêm 1 page khác
app.get('/news', (req, res) => {
  res.render('news');
})

// tao page search
app.get('/search', (req, res) => {
    res.render('search');
})

// cổng
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})