const { check, validationResult } = require('express-validator');

exports.validateInput = check('articleTitle', 'invalid title').matches(/^nour/);