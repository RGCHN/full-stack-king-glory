module.exports = options=>{
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    const AdminUsers = require('../models/AdminUser');

    return async (req,res,next)=>{
        const token = String(req.headers.authorization||'').split(' ').pop();
        assert(token,401,'请先登录')
        //获取到的id就是用户的id
        const {id} = jwt.verify(token,req.app.get('secret'));
        assert(id,401,'请先登录')
        //挂载到req上  表示客户端请求的那个用户对象是谁
        req.user = await AdminUsers.findById(id);
        assert(req.user,'402','请先登录')
        await next()
    }
}