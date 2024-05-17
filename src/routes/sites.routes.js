const express = require('express');
const SiteController = require('../controllers/siteController');

//tao ra Router để điều hướng
const siteRouter = express.Router();

const sitesController = new SiteController();

siteRouter.use('/news', sitesController.news);
siteRouter.use('/search', sitesController.search);
siteRouter.use('/', sitesController.home);

module.exports = siteRouter;