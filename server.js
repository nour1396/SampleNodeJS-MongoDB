const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const port = process.env.PORT || 1996;
const articleRouter = require('./routing/article.routes');
const configDB = require('./database/db');

//static path for css and javascript files
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//set view engine
app.set('view engine', 'ejs');

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//connect to mongoDB
mongoose.connect(configDB.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, (err) => { console.log('connected to DB ^_^ ', err) });

//upload photos
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + Math.random() * 100 + file.originalname)
    }
})
app.use(multer({ dest: 'uploads', storage }).single('imageUploaded'))

//routing files
app.use(articleRouter);

//listening of port 
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});