var express = require('express');
var router = express.Router();
const message = require('../constrollers/message')

router.route('/')
    .get(message.findAll)
    .delete(message.remove)

module.exports = router