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


const Positions = mongoose.model('movies',{
  movieName:String,
  score:String,
  star:String,
  showtime:String
})
module.exports = {
    Users,
    Positions
}