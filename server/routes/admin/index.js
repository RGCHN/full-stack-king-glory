//module导出的是函数 该函数接受app作为参数
module.exports = app => {
    const express = require('express');

    const router = express.Router({
        mergeParams:true
    });
    const Category = require('../../models/Category');

    //categories是mongodb的实例模型，直接在正面进行数据库的crud
    //创建资源
    router.post('/',async(req,res)=>{
        const model = await req.Model.create(req.body);
        res.send(model);
    })
    //资源列表 限制100条数据
    router.get('/',async(req,res)=>{
        const queryOptions = {};
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent';
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100);
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

    //通用套接口
    app.use('/admin/api/rest/:resource',async (req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`);
        next();
    },router)

    //multer作为中间件，处理上传文件
    const multer = require('multer');
    //dest：目标地址 uploads文件夹
    const upload = multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        const file = req.file;
        //在服务端的路径 要自己拼出来 暂时设为固定
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    })
}