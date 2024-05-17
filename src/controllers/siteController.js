class SiteController {

    //[GET] /
    //tuyến tạo đường link dẫn đến trang chủ
    home(req,res) {
        res.render('home')
    }

    // [GET] /news
    news(req, res) {
        res.render('news');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = SiteController;