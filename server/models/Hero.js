//英雄模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{type:String},
    avatar:{type: String},
    title:{type:String},
    //分类不仅有一个 可能要关联多个 用数组存储
    categories:[{type:mongoose.SchemaTypes.ObjectID,ref:'Category'}],
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},
    }],
    item1:[{
        type:mongoose.SchemaTypes.ObjectID,ref:'Item',
        tips:{type:String}
    }],
    item2:[{
        type:mongoose.SchemaTypes.ObjectID,ref:'Item',
        tips:String
    }],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectID,ref:'Hero'},
        description:{type:String}
    }]
})

module.exports = mongoose.model('Hero',schema,'heroes')