const articleRouter = require('express').Router();
const Article = require('../models/model.article');

//get home page
articleRouter.get('/', (req, res) => {
    //show all articles in db 
    Article.find({}).then((result) => {
        res.render('index', { result });
    })
})

//save data form of add articles to routeDB in table blogs
articleRouter.post('/addNewarticle', async(req, res) => {
    let article = {
        articleTitle: req.body.articleTitle,
        articleContent: req.body.articleContent,
        imageUploaded: req.file.path,
        publishDate: Date.now()
    };
    console.log(article.imageUploaded);
    Article.insertMany(article).then(() => {
        res.redirect('/');
    }).catch(err => { console.log(err); })
});

//delete selected data from blogs
articleRouter.get('/delete/:id', async(req, res) => {
    let id = req.params.id;
    Article.deleteOne({ _id: id }).then(() => {
        res.redirect('/');
    });
});

//edit selected data from blogs table
articleRouter.get('/edit/:id', async(req, res) => {
    let id = req.params.id;
    Article.find({ _id: id }).then((result) => {
        console.log(result);
        res.render('editArticle', { result });
    })

});

//post edited data to blogs table
articleRouter.post('/editArticle/:id', async(req, res) => {
    let id = req.params.id;
    Article.update({ _id: id }, { articleTitle: req.body.articleTitle, articleContent: req.body.articleContent, imageUploaded: req.file.path }).then(() => {
        res.redirect('/');
    })
});

//get specific data from blogs table
articleRouter.get('/readMore/:id', async(req, res) => {
    let id = req.params.id;
    Article.find({ _id: id }).then((result) => {
        console.log(result);
        res.render('readMorearticle', { result });
    })
});

//sarch in titles or content or both from blogs table
articleRouter.get('/search', async(req, res) => {
    let search = req.query.search;
    Article.find({ articleTitle: `/^${search}/` }).then((result) => {
        console.log(result);
        res.render('searchArticle', { result });
    })
});

//export module to be used in server file
module.exports = articleRouter;