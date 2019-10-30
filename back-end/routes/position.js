var express = require('express');
var router = express.Router()

let position = require('../constrollers/position')

// router.get('/findAll',position.findAll)

// router.get('/findusersAll',position.findusersAll)

// router.post('/save',position.save)

router.route('/')
    .get(position.findAll)
    .post(position.save)
    .patch(position.update)
    .delete(position.remove)

router.get('/findOne',position.findOne)

router.get('/findusersAll',position.findusersAll)

router.post('/search',position.search)

module.exports = router