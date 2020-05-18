const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username:{type:String},
    //密码做散列 不能直接保存 值越大耗时越多 10-12一般设置
    password:{
        type:String,
        //不被选择 防止密码被多次散列 只散列一次
        select:false,
        set(val){
        return require('bcrypt').hashSync(val,10);
    }}
})

module.exports = mongoose.model('AdminUser',schema)