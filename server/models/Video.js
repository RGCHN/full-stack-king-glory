//视频模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:{type:String},
    hyperlink:{type: String},
    preview:{type:String},
    date:{type:String},
    playTimes:{type:Number},
    categories:[{type:mongoose.SchemaTypes.ObjectID,ref:'Category'}],
})

module.exports = mongoose.model('Video',schema,'videos')