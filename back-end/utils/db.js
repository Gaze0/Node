const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/project-users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Users = mongoose.model('Users',{
    username : String,
    password : String,
    email: String
})


const Message = mongoose.model('messages',{
  message:String,
  createtime:String
})

const Positions = mongoose.model('movies',{
  movieId:Number,
  poster:String,
  movieName:String,
  score:String,
  star:String,
  wish:Number,
  version:String,
  showtime:String,
  showInfo:String,
  globalReleased:Boolean
})
module.exports = {
    Users,
    Positions,
    Message
}