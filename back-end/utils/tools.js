const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fs = require('fs')
const path =require('path')

const hash = (password)=>{
    return new Promise((resolve,reject)=>{
        // bcrypt.hash(password, 10, function(err, hash) {
        //     resolve(hash)
        // });
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                resolve(hash)
            })
        })
    })
}

const compare = (password,hash)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,hash,function(err, res){
            resolve(res)
        })
    })
}

const getToken = (username) =>{
    return new Promise((resolve,reject)=>{
        let cert = fs.readFileSync(path.resolve(__dirname,'../key/rsa_private_key.pem'))
        jwt.sign({username},cert,{algorithm:'RS256'},(err,decoded)=>{
            resolve(decoded)
        })
    })
}

const verifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
        let cert = fs.readFileSync(path.resolve(__dirname,'../key/rsa_public_key.pem'))
        jwt.verify(token,cert,(err,decoded)=>{
            resolve(decoded)
        })
    })
}
module.exports = {
    hash,
    compare,
    getToken,
    verifyToken
}