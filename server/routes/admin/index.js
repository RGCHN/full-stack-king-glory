//module导出的是函数 该函数接受app作为参数
module.exports = app => {
    const express = require('express');
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    const AdminUsers = require('../../models/AdminUser');
    const router = express.Router({
        mergeParams:true
    });

    //登录校验中间件
    const authMiddleware = require('../../middleware/auth');
    const resourceMiddleware = require('../../middleware/resource');
    //通用套接口
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)

    //multer中间件处理上传文件
    const multer = require('multer');
    //dest：目标地址 uploads文件夹
    const upload = multer({dest:__dirname + '/../../uploads'})


    app.post('/admin/api/upload',authMiddleware(),upload.single('file'),async(req,res)=>{
        const file = req.file;
        //在服务端的路径 要自己拼出来 暂时设为固定
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    })


    //categories是mongodb的实例模型，直接在正面进行数据库的crud
    //创建资源
    router.post('/',async(req,res)=>{
        const model = await req.Model.create(req.body);
        res.send(model);
    })
    //资源列表 限制100条数据
    router.get('/' ,async(req,res)=>{
        const queryOptions = {};
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent';
        }
        const items = await req.Model.find().setOptions(queryOptions);
        res.send(items);
    })
    //获取资源详情
    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })
    //删除资源
    router.delete('/:id',async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body);
        res.send({
            success:true
        });
    })
    //更新资源
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body);
        res.send(model);
    })

    //用户注册
    app.post('/admin/api/register',async(req,res)=>{
        const {username,password} = req.body;
        const user = await AdminUsers.findOne({username:username});
        if(user){
            res.send({flag:false})
        }else{
            await AdminUsers.insertMany({
                username:username,
                password:password
            })
            res.send({flag:true})
        }
    })


    //用户登录密码校验
    app.post('/admin/api/login',async(req,res)=>{
        const {username,password} = req.body;
        //根据用户名找用户
        const user = await AdminUsers.findOne({username:username}).select('+password');
        assert(user,422,'用户不存在')
        /*if(!user){
            return res.status(422).send({
                message:'用户不存在'
            })

        }*/
        //校验密码
        const isValid = require('bcrypt').compareSync(password,user.password)
        assert(isValid,422,'密码错误');
        /*if(!isValid){
            return res.status(422).send({
                message:'用户密码错误'
            })
        }*/

        //返回token
        //获取全局配置的secret
        const token = jwt.sign({id:user._id},app.get('secret'));
        res.send({token})
    })

    //错误处理函数
    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode||500).send({
            message:err.message
        })
    })
}