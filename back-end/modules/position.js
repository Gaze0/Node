const { Positions } = require('../utils/db')

const save = (data)=>{
    let position = new Positions(data)
    return position.save()
}

const findAll = async ({start,count})=>{
    let total = await Positions.find({}).count();
    let list = await Positions.find({}).sort({_id:-1}).limit(~~count).skip(~~start)
    return {
        list,
        total
    }
    // return  await Positions.find({}).sort({_id:-1})
}

const findOne = async (id)=>{
    return await Positions.findById(id)
}

const update = async (data)=>{
    return await Positions.findByIdAndUpdate(data.id,data)
}

const remove = async(id)=>{
    return await Positions.findByIdAndDelete(id)
}

const search = async(keyword)=>{
    let reg = RegExp(keyword,'gi')
    return await Positions.find({}).or([{movieName:reg},{star:reg},{showtime:reg}])

}
module.exports = {
    save,
    findAll,
    update,
    findOne,
    remove,
    search
}