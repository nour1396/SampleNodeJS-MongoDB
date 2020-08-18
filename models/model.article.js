const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    articleTitle: String,
    articleContent: String,
    publishDate: Date,
    imageUploaded: String
});

const Article = mongoose.model("articles", articleSchema);
module.exports = Article;