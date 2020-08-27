const articleRouter = require('express').Router();
const articleController = require('../controllers/article.controller');
const validateController = require('../controllers/validate.controller');
const { check, validationResult } = require('express-validator');
const Article = require('../models/model.article');
//get home page
articleRouter.get('/', articleController.getAllArticles)

//save data form of add articles to routeDB in table blogs
articleRouter.post('/addNewarticle', validateController.validateInput, articleController.addArticle);

//delete selected data from blogs
articleRouter.get('/delete/:id', articleController.deleteArticle);

//edit selected data from blogs table
articleRouter.get('/edit/:id', articleController.editArticle);

//post edited data to blogs table
articleRouter.post('/editArticle/:id', articleController.postEditedArticle);

//get specific data from blogs table
articleRouter.get('/readMore/:id', articleController.readMoreArticle);

//sarch in titles or content or both 
articleRouter.get('/search', articleController.searchInArticles);

//export module to be used in server file
module.exports = articleRouter;