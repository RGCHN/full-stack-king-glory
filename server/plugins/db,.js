module.exports = app => {
    //连接mongodb
    const mongoose = require("mongoose");
    mongoose.connect('mongodb://127.0.0.1:27017/KingGlory',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    mongoose.connection.on('error',err=>console.log('Mongoose connection error:'+err));
    mongoose.connection.on('disconnect',()=>console.log('Mongoose connection disconnected'))
    //引入所有models 防止出错
    require('require-all')(__dirname + '/../models')
}