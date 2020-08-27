const Article = require('../models/model.article');
const { check, validationResult } = require('express-validator');


exports.getAllArticles = (req, res) => {
    //show all articles in db 
    Article.find({}).then((result) => {
        res.render('index', { result, messageError: [] });
    })
};

exports.addArticle = async(req, res) => {
    let errors = validationResult(req)
    let article = {
        articleTitle: req.body.articleTitle,
        articleContent: req.body.articleContent,
        imageUploaded: req.file.path,
        publishDate: Date.now()
    };
    console.log(errors);

    if (errors.isEmpty()) {
        Article.insertMany(article).then(() => {
            res.redirect('/');
        }).catch(err => { console.log(err); })
    } else {
        Article.find({}).then((result) => {
            res.render('index', { result, messageError: [] });
        })
    }
}




exports.deleteArticle = async(req, res) => {
    let id = req.params.id;
    Article.deleteOne({ _id: id }).then(() => {
        res.redirect('/');
    });
};

exports.editArticle = async(req, res) => {
    let id = req.params.id;
    Article.find({ _id: id }).then((result) => {
        console.log(result);
        res.render('editArticle', { result });
    })
};

exports.postEditedArticle = async(req, res) => {
    let id = req.params.id;
    Article.update({ _id: id }, { articleTitle: req.body.articleTitle, articleContent: req.body.articleContent, imageUploaded: req.file.path }).then(() => {
        res.redirect('/');
    })
};

exports.readMoreArticle = async(req, res) => {
    let id = req.params.id;
    Article.find({ _id: id }).then((result) => {
        console.log(result);
        res.render('readMorearticle', { result });
    })
};

exports.searchInArticles = async(req, res) => {
    let search = req.query.search;
    /* { $regex: "^" + search, $options: 'i' } //to search in string which starting with specific letter or word
       { $regex: search, $options: 'i' } // to seach in any part in string*/
    Article.find({ articleTitle: { $regex: search, $options: 'i' } }).then((result) => {
        console.log(result);
        res.render('searchArticle', { result });
    })
};