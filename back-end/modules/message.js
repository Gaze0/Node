const { Message } = require('../utils/db')


const save = (data)=>{
    const messages = new Message(data)
    return messages.save()
}

const findAll = async ({start,count})=>{
    return await Message.find({}).sort({_id:-1}).limit(~~count).skip(~~start)
    
}

const remove = async (id)=>{
    return await Message.findByIdAndDelete(id)
}

module.exports = {
    save,
    findAll,
    remove
}