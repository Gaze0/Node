const { Users } = require('../utils/db')

const save = (data)=>{
    const users = new Users(data)
    return users.save()
}

const findOne = (conditions)=>{
    return Users.findOne(conditions)
}

const findAll = ()=>{
    return Users.find({})
}
module.exports = {
    save,
    findOne,
    findAll
}
