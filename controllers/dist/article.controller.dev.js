"use strict";

var Article = require('../models/model.article');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

exports.getAllArticles = function (req, res) {
  //show all articles in db 
  Article.find({}).then(function (result) {
    res.render('index', {
      result: result,
      messageError: []
    });
  });
};

exports.addArticle = function _callee(req, res) {
  var errors, article;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);
          article = {
            articleTitle: req.body.articleTitle,
            articleContent: req.body.articleContent,
            imageUploaded: req.file.path,
            publishDate: Date.now()
          };
          console.log(errors);

          if (errors.isEmpty()) {
            Article.insertMany(article).then(function () {
              res.redirect('/');
            })["catch"](function (err) {
              console.log(err);
            });
          } else {
            Article.find({}).then(function (result) {
              res.render('index', {
                result: result,
                messageError: []
              });
            });
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.deleteArticle = function _callee2(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          Article.deleteOne({
            _id: id
          }).then(function () {
            res.redirect('/');
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.editArticle = function _callee3(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          Article.find({
            _id: id
          }).then(function (result) {
            console.log(result);
            res.render('editArticle', {
              result: result
            });
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.postEditedArticle = function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          Article.update({
            _id: id
          }, {
            articleTitle: req.body.articleTitle,
            articleContent: req.body.articleContent,
            imageUploaded: req.file.path
          }).then(function () {
            res.redirect('/');
          });

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.readMoreArticle = function _callee5(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          Article.find({
            _id: id
          }).then(function (result) {
            console.log(result);
            res.render('readMorearticle', {
              result: result
            });
          });

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.searchInArticles = function _callee6(req, res) {
  var search;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          search = req.query.search;
          /* { $regex: "^" + search, $options: 'i' } //to search in string which starting with specific letter or word
             { $regex: search, $options: 'i' } // to seach in any part in string*/

          Article.find({
            articleTitle: {
              $regex: search,
              $options: 'i'
            }
          }).then(function (result) {
            console.log(result);
            res.render('searchArticle', {
              result: result
            });
          });

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
};