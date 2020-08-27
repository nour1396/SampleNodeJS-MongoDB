"use strict";

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

exports.validateInput = check('articleTitle', 'invalid title').matches(/^nour/);