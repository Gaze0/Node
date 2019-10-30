const multer = require('multer')
const path = require('path')
const randomstring = require('randomstring')
// var upload = multer({dest:path.resolve(__dirname,'../public/upload')})

// module.exports = ((req,res,next)=>{
//     return upload.single('poster')
// })()

var filename = ''
const mimetypeMap = {
    'image/png':'.png',
    'image/jpg':'.jpg',
    'image/jpeg':'.jpeg',
    'image/gif':'.gif'
}
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(__dirname,'../public/upload'))
    },
    filename:(req,file,cb)=>{
        let { fieldname, mimetype } = file
        console.log(file)
        filename = fieldname + '-' + randomstring.generate(7)+  mimetypeMap[mimetype]
        cb(null,filename)
    }
})
var upload = multer({
    storage
}).single('poster')

module.exports = (req,res,next)=>{
    upload(req,res,(err)=>{
        req.filename = filename
        next()
    })
}