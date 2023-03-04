const express = require('express')
const app = express()
const port = 3000

// route: tuyến tạo đường link dẫn đến trang chủ
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// cổng
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})