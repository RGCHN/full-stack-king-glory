//模拟前端路由
module.exports = app=>{
    const router = require('express').Router();
    const mongoose = require('mongoose');
    const Category = mongoose.model('Category');
    const Article = mongoose.model('Article');
    //路由仅用于数据录入

    //导入新闻数据
    router.get('/news/init',async(req,res)=>{
        const parent = await Category.findOne({
            name:'新闻资讯',
        })
        //取JSON
        const cats = await Category.find().where({
            parent:parent
        }).lean();
        //为每个title随机分配两个category分类
        const newsTitles = ["【520情侣皮肤】所有等待，只为重逢", "UI改造日志第四期：背包系统优化在即，局内快捷消息更智能！", "《五虎上将交响曲》揭秘，一起来看看你的音乐公开课随堂笔记吧！", "0元免流畅玩包，轻轻松松上王者", "王者荣耀联合乘车码送豪华大礼，五五开黑不氪金！", "5月22日实战模拟维护公告", "5月22日体验服停机更新公告", "5月22日iOS登录异常及补偿公告", "5月22日全服不停机优化公告", "5月21日“演员”惩罚名单", "爱在峡谷 甜蜜520", "DIY告白信 520陪您花式告白", "峡谷迎初夏，好礼领不停", "黄忠-烈魂五虎上将限定皮肤即将上架，缤纷好礼齐降临", "“五五打卡游”活动开启", "虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决", "2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布", "2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战", "【原创内容大赛音乐比赛】优秀作品合集（二）", "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态"];
        const newsList = newsTitles.map(title=>{
            const randomCats = cats.slice(0).sort(()=>Math.random()-0.5);
            return {
                categories:randomCats.slice(0,2),
                title:title
            }
        })
        //批量插入新闻资讯的标题和分类数据
        /*await Article.deleteMany();
        await Article.insertMany(newsList);*/
        res.send(newsList);
        //newsList中key有两个——categories和title 分别表示分类和标题名
    });

    //新闻数据接口
    router.get('/news/list',async(req,res)=>{
        const parent = await Category.findOne({
            name:'新闻资讯',
        })
        //使用聚合查询
        const cats = await Category.aggregate([
            {$match:{parent:parent._id}},
            //做外链接 为主体查询另外一个集合 在Article中查找parent相同的数据
          {
                $lookup:{
                    //集合名 等于模型名转小写再转复数
                    from:'articles',
                    localField:'_id',
                    foreignField:'categories',
                    as:'newsList'
            }},
            {
                $addFields:{
                    //取newsList中的5个元素
                    newsList:{$slice:['$newsList',5,]}
                }
            }
        ])

        const subCats = cats.map(v=>v._id);
        //抽5个作为热门数据
        cats.unshift({
            name:'热门',
            newsList:await Article.find().where({
                categories:{$in:subCats}
            }).populate('categories').limit(5).lean()
        })
        //修改分类 方便展示 热门分类下的文章按分类的第一个展示分类名 非热门文章按所属分类展示分类名
        cats.map(cat=>{
            cat.newsList.map(news=>{
                news.categoriesName = cat.name==='热门'?news.categories[0].name:cat.name;
                return news
            })
            return cat
        })
        res.send(cats)
    })

    //导入英雄数据
    //["热门", "战士", "法师", "坦克", "刺客", "射手", "辅助"]


    app.use('/web/api',router);
}