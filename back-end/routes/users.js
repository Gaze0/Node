var express = require('express');
var router = express.Router();

const { usersignup ,hasUsername,userslogin,isSignin,signout , email} = require('../constrollers/users');
/* GET users listing. */
// console.log(usersignup)
router.post('/signup', hasUsername, usersignup);

router.post('/login',userslogin)

router.get('/isSignin',isSignin)

router.get('/signout',signout)

router.post('/send',email)


module.exports = router;
