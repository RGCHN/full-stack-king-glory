//模拟前端路由
module.exports = app=>{
    const router = require('express').Router();
    const mongoose = require('mongoose');
    const Category = mongoose.model('Category');
    const Article = mongoose.model('Article');
    const Hero = mongoose.model('Hero');
    const Item = mongoose.model('Item');
    const Video = mongoose.model('Video');
    const Walkthrough = mongoose.model('Walkthrough')
    //路由仅用于数据录入 谨慎点开init路由 （；´д｀）ゞ

    //导入新闻数据
    /*router.get('/news/init',async(req,res)=>{
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
        /!*await Article.deleteMany();
        await Article.insertMany(newsList);*!/
        res.send(newsList);
        //newsList中key有两个——categories和title 分别表示分类和标题名
    });*/

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
    router.get('/heroes/init',async(req,res)=>{
        /*await Hero.deleteMany();
        const parent = await Category.findOne({
            name:'英雄',
        })
        await Category.deleteMany({
            parent:parent
        })
        const heroType = ["战士", "法师", "坦克", "刺客", "射手", "辅助"];
        const typeList = heroType.map(el=>{
            return {
                name:el,
                parent:parent._id
            }
        })*/
        const rawData = [{"name":"热门","heros":[{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"妲己","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"韩信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"伽罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"}]},{"name":"战士","heros":[{"name":"赵云","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"墨子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"钟无艳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"吕布","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"夏侯惇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"曹操","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"},{"name":"典韦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"宫本武藏","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"},{"name":"达摩","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"老夫子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"},{"name":"关羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},{"name":"程咬金","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"露娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"花木兰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"橘右京","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"刘备","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"},{"name":"钟馗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"杨戬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"},{"name":"雅典娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},{"name":"哪吒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"苏烈","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"裴擒虎","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"狂铁","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},{"name":"孙策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"李信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"},{"name":"盘古","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"},{"name":"云中君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"},{"name":"曜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"},{"name":"马超","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"}]},{"name":"法师","heros":[{"name":"小乔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"},{"name":"墨子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"妲己","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"嬴政","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"},{"name":"高渐离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"},{"name":"孙膑","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},{"name":"扁鹊","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"},{"name":"芈月","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"周瑜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"},{"name":"甄姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"武则天","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"},{"name":"貂蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"安琪拉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"露娜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"姜子牙","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"},{"name":"王昭君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"},{"name":"张良","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"},{"name":"不知火舞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"钟馗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"诸葛亮","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"},{"name":"干将莫邪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"},{"name":"女娲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"},{"name":"杨玉环","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},{"name":"弈星","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"},{"name":"米莱狄","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"},{"name":"司马懿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"沈梦溪","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"},{"name":"上官婉儿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"嫦娥","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"},{"name":"西施","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"}]},{"name":"坦克","heros":[{"name":"廉颇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"},{"name":"庄周","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"刘禅","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},{"name":"钟无艳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"白起","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"},{"name":"芈月","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"吕布","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"夏侯惇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"达摩","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"项羽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"},{"name":"程咬金","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"刘邦","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"},{"name":"亚瑟","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"牛魔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},{"name":"张飞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},{"name":"太乙真人","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},{"name":"东皇太一","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},{"name":"铠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"苏烈","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"梦奇","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},{"name":"孙策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"嫦娥","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"},{"name":"猪八戒","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"}]},{"name":"刺客","heros":[{"name":"赵云","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"阿轲","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"},{"name":"李白","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"},{"name":"貂蝉","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"韩信","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"兰陵王","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"},{"name":"花木兰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"不知火舞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"娜可露露","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"},{"name":"橘右京","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"孙悟空","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"百里守约","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"百里玄策","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"},{"name":"裴擒虎","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"元歌","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"},{"name":"司马懿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"上官婉儿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"云中君","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"},{"name":"马超","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"},{"name":"镜","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg"}]},{"name":"射手","heros":[{"name":"孙尚香","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"鲁班七号","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"马可波罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},{"name":"狄仁杰","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"},{"name":"后羿","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"李元芳","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"},{"name":"虞姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"},{"name":"成吉思汗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"},{"name":"黄忠","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"},{"name":"百里守约","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"公孙离","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"},{"name":"伽罗","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"},{"name":"蒙犽","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg"}]},{"name":"辅助","heros":[{"name":"庄周","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"刘禅","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},{"name":"孙膑","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},{"name":"姜子牙","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"},{"name":"牛魔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},{"name":"张飞","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},{"name":"蔡文姬","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"},{"name":"太乙真人","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},{"name":"大乔","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"},{"name":"鬼谷子","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"},{"name":"明世隐","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"},{"name":"杨玉环","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},{"name":"盾山","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},{"name":"瑶","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"},{"name":"鲁班大师","avatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"}]}];
        for(let cat of rawData){
            if(cat.name==='热门') continue;
            //找到当前分类在数据库中对应的数据
            const category = await Category.findOne({
                name:cat.name
            })
            //为每个英雄添加对应的分类
            cat.heros.map(hero=>{
                hero.categories = [category];
                return hero;
            })
            //await Hero.insertMany(cat.heros);
        }
        res.send(await Hero.find());
    })

    //获取英雄列表接口
    router.get('/heroes/list',async(req,res)=>{
        const parent = await Category.findOne({
            name:'英雄',
        })
        const cats  = await Category.aggregate([
            {$match:{parent:parent._id}},
            {
                $lookup:{
                    from:'heroes',
                    localField:'_id',
                    foreignField: 'categories',
                    as:'heroesList'
                }
            }
        ])
        const subCats = cats.map(v=>v._id);
        cats.unshift({
            name:'热门',
            heroesList:await Hero.find().where({
                categories:{$in:subCats}
            }).limit(10).lean()
        })

        res.send(cats)
    })

    //新闻（文章详情）
    router.get('/articles/:id',async(req,res)=>{
        const data = await Article.findById(req.params.id).lean();
        data.related = await Article.find().where({
            categories:{$in:data.categories}
        }).limit(2);
        res.send(data);
    })

    //英雄数据
    router.get('/heroes/:id',async(req,res)=>{
        const data = await Hero.findById(req.params.id)
            .populate('categories')
            .lean();
        res.send(data);
    })

    //物品数据
    router.get('/items/init',async(req,res)=>{
        const rawData = [{"name":"铁剑","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1111.jpg"},{"name":"匕首","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1112.jpg"},{"name":"搏击拳套","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1113.jpg"},{"name":"吸血之镰","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1114.jpg"},{"name":"雷鸣刃","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1116.jpg"},{"name":"冲能拳套","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1117.jpg"},{"name":"风暴巨剑","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1121.jpg"},{"name":"日冕","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1122.jpg"},{"name":"狂暴双刃","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1123.jpg"},{"name":"陨星","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1124.jpg"},{"name":"碎星锤","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1131.jpg"},{"name":"末世","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1126.jpg"},{"name":"名刀·司命","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1127.jpg"},{"name":"冰霜长矛","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1128.jpg"},{"name":"速击之枪","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1129.jpg"},{"name":"制裁之刃","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/11210.jpg"},{"name":"泣血之刃","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1132.jpg"},{"name":"无尽战刃","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1133.jpg"},{"name":"宗师之力","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1134.jpg"},{"name":"闪电匕首","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1135.jpg"},{"name":"影刃","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1136.jpg"},{"name":"暗影战斧","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1137.jpg"},{"name":"破军","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1138.jpg"},{"name":"纯净苍穹","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/11311.jpg"},{"name":"逐日之弓","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/91040.jpg"},{"name":"破魔刀","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1125.jpg"},{"name":"穿云弓","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1154.jpg"},{"name":"破晓","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1155.jpg"},{"name":"咒术典籍","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1211.jpg"},{"name":"蓝宝石","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1212.jpg"},{"name":"炼金护符","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1213.jpg"},{"name":"圣者法典","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1214.jpg"},{"name":"元素杖","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1216.jpg"},{"name":"大棒","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1221.jpg"},{"name":"破碎圣杯","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1229.jpg"},{"name":"光辉之剑","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1223.jpg"},{"name":"魅影面罩","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1224.jpg"},{"name":"进化水晶","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1225.jpg"},{"name":"血族之书","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1222.jpg"},{"name":"炽热支配者","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1227.jpg"},{"name":"梦魇之牙","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/12211.jpg"},{"name":"虚无法杖","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1231.jpg"},{"name":"博学者之怒","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1232.jpg"},{"name":"辉月","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1239.jpg"},{"name":"回响之杖","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1233.jpg"},{"name":"冰霜法杖","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1234.jpg"},{"name":"痛苦面具","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1235.jpg"},{"name":"巫术法杖","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1236.jpg"},{"name":"圣杯","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1226.jpg"},{"name":"时之预言","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1237.jpg"},{"name":"贤者之书","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1238.jpg"},{"name":"噬神之书","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1240.jpg"},{"name":"红玛瑙","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1311.jpg"},{"name":"布甲","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1312.jpg"},{"name":"抗魔披风","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1313.jpg"},{"name":"提神水晶","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1314.jpg"},{"name":"力量腰带","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1321.jpg"},{"name":"熔炼之心","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1322.jpg"},{"name":"神隐斗篷","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1323.jpg"},{"name":"雪山圆盾","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1324.jpg"},{"name":"守护者之铠","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1325.jpg"},{"name":"近卫荣耀","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1724.jpg"},{"name":"奔狼纹章","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1723.jpg"},{"name":"反伤刺甲","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1327.jpg"},{"name":"血魔之怒","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1328.jpg"},{"name":"红莲斗篷","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1331.jpg"},{"name":"霸者重装","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1332.jpg"},{"name":"冲击铠甲","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1341.jpg"},{"name":"不祥征兆","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1333.jpg"},{"name":"不死鸟之眼","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1334.jpg"},{"name":"魔女斗篷","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1335.jpg"},{"name":"极寒风暴","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1336.jpg"},{"name":"冰痕之握","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/13310.jpg"},{"name":"贤者的庇护","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1337.jpg"},{"name":"暴烈之甲","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1338.jpg"},{"name":"神速之靴","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1411.jpg"},{"name":"影忍之足","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1421.jpg"},{"name":"抵抗之靴","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1422.jpg"},{"name":"冷静之靴","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1423.jpg"},{"name":"秘法之靴","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1424.jpg"},{"name":"急速战靴","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1425.jpg"},{"name":"疾步之靴","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1426.jpg"},{"name":"狩猎宽刃","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1511.jpg"},{"name":"游击弯刀","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1521.jpg"},{"name":"巡守利斧","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1522.jpg"},{"name":"追击刀锋","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1523.jpg"},{"name":"符文大剑","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1531.jpg"},{"name":"巨人之握","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1532.jpg"},{"name":"贪婪之噬","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1533.jpg"},{"name":"鼓舞之盾","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1714.jpg"},{"name":"风灵纹章","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1713.jpg"},{"name":"救赎之翼","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1722.jpg"},{"name":"风之轻语","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1712.jpg"},{"name":"极影","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1721.jpg"},{"name":"星泉","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1725.jpg"},{"name":"星之佩饰","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1726.jpg"},{"name":"凤鸣指环","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1711.jpg"},{"name":"学识宝石","icon":"https://game.gtimg.cn/images/yxzj/img201606/itemimg/1701.jpg"}]
        await Item.insertMany(rawData);
        res.send(await Item.find())
    })

    //视频数据
    router.get('/videos/list',async(res,req)=>{
        const parent = await Category.findOne({
            name:'精彩视频'
        })
        const cats= await Category.aggregate([
            {$match:{parent:parent._id}},
            {
                $lookup:{
                    from:'videos',
                    localField:'_id',
                    foreignField:'categories',
                    as:'videoList'
                }
            }
        ])
        req.send(cats);
    })

    //图文攻略
    //录入数据 最新
    router.get('/walkthrough/init',async(res,req)=>{
        //await Walkthrough.deleteMany();
        /*const zuixin = [{"title":"剑仙李白与女王芈月，有些人是无法被征服的","preview":"https://itea-cdn.qq.com/file/tgl/2020060319/c9f0f895fb98ab9159f51fd0297e236d.1591184953.cfb9c76cae58b570219c09ab0d24c6cf.230x140_54552.jpg"},{"title":"攻略文｜上官婉儿的天狼绘梦者来了，学会3招让你玩转这个法师！","preview":"https://itea-cdn.qq.com/file/tgl/2020060320/30565a8911a6bb487e3745c0ea3c8224.1591187235.2298e907eb0f06a1cb1f795e86a3ae95.230x140_69062.png"},{"title":"上官婉儿天狼绘梦者6折起，孤影直呼太美，五虎限定什么时候出","preview":"https://itea-cdn.qq.com/file/tgl/2020060319/e55f48c24127e6933291dba523b13296.1591184821.61e085d7855ae4dc741f0053d46f9ae1.230x140_77628.png"},{"title":"s19赛季小乔的进阶玩法，掌握进场时机团战瞬间带走对手","preview":"https://itea-cdn.qq.com/file/tgl/2020060223/d8fd93dcb07f1ce3d5ff992ecc745b8e.1591111596.90e9736973c80f146b01e3a5f53eee6c.184x124_45283.jpg"},{"title":"王者荣耀：推塔流法师的荣光，一位登上KPL，另一位却坐冷板凳","preview":"https://itea-cdn.qq.com/file/tgl/2020060317/83d3a9409143b5e4c77ba4d6a14f3b5b.1591176834.3696890855e66a0ff45f792485986cc2.184x124_54940.png"},{"title":"王者荣耀：马可细节教程，让你的马可波罗高人一阶","preview":"https://itea-cdn.qq.com/file/tgl/2020060311/ba807a9bd475b0366917f2e218a7d95c.1591156721.91240ee39496ae6c8a61720087f576f7.184x124_55787.png"},{"title":"高端局T0级别的打野，胜率53.96%，禁用率高达50%","preview":"https://itea-cdn.qq.com/file/tgl/2020060215/235952add03ecffe06d5bbf9cdb3ae16.1591083352.001f0780ecfa1ff866df2f5e0d617389.184x124_39689.jpg"},{"title":"王者荣耀：增2改6，体验服更新，法师装备面临大调整","preview":"https://itea-cdn.qq.com/file/tgl/2020060213/1ad06ee75e5fbd8f398e19d1f4ba0309.1591074366.8f7b17ec7c20ada164d734da51012fe4.184x124_55581.png"},{"title":"KPL：LGD季后赛原形毕露！制裁强队的不是版本，而是线下赛","preview":"https://itea-cdn.qq.com/file/tgl/2020053122/1dd9735b83fc4a8aeab756f90c763bcb.1590936178.23f5f958335d7efcf7714c43edbe70c1.184x124_52194.png"},{"title":"英雄细节篇｜你真的了解亚瑟的大招吗？","preview":"https://itea-cdn.qq.com/file/tgl/2020053120/96a3be3cf272e017046d1b2674a52bd3.1590929226.4760073bbb97eb5b23998ce89322607a.184x124_52716.png"},{"title":"王者荣耀从逐梦到天狼星,，KPL从未让人失望，今年会花落谁家","preview":"https://itea-cdn.qq.com/file/tgl/2020060214/cfcd208495d565ef66e7dff9f98764da.1591080420.79f7e4788900407bf9f340f44f0b7664.184x124_40156.jpg"},{"title":"成都AG卫冕关键战，这一次他们能否再胜DYG？","preview":"https://shp.qpic.cn/cfwebcap/0/a8548fb8e90032a0f0225dd861ff325e/0/?width=230&height=140"},{"title":"小变化竟堪比史诗级加强　小萝莉终成中路大法王","preview":"https://itea-cdn.qq.com/file/tgl/2020060213/d57cad249e01bd8160803693daf94174.1591075692.083cb38d0a33972d0b4d68831b646865.184x124_58738.png"},{"title":"让我们恭喜广州TTG.XQ4：2杭州LGD大鹅！进入四强！！","preview":"https://itea-cdn.qq.com/file/tgl/2020053120/627c48f05eef473971697bf0cdd1144b.1590929071.6f4bfd69cbab566200acb95007e8f81d.184x124_38033.jpg"},{"title":"王者荣耀：坦克崛起版本，AP梦奇比AD梦奇更适合使用（下篇）","preview":"https://itea-cdn.qq.com/file/tgl/2020060222/1d2212c918e9386543a4371d31aa8e63.1591107486.c9a8c34fa55622ece1fa64cc3fe8fdbd.230x140_82691.png"},{"title":"开黑骚套路，蒙恬将军+工具人王昭君，蒙恬有了第五位工具人？","preview":"https://itea-cdn.qq.com/file/tgl/2020060310/373799c476ef93f25b919cbf9dd58a00.1591150247.123289ca42ce34517f1e817e2a030110.230x140_78772.png"}];*/
       //const tongren = [{"title":"《创世王者》——长城之战五 庆功宴","preview":"https://itea-cdn.qq.com/file/tgl/20190709/4134d9e2acb614ea98c12902490a8541.1562656487.ad2289a391fbeb879ae38941f82af8bf.230x140_16538.jpg"},{"title":"露娜 紫霞仙子 孙悟空 至尊宝cos：往哪跑？","preview":"https://itea-cdn.qq.com/file/tgl/20190710/0ac88cfa3358a41a848a0996ba2980d1.1562760261.c6b7c09ebef1df462c7df296aa94cc46.230x140_7096.jpg"},{"title":"同人插画：马超帅出新高度，面对千军万马无所畏惧","preview":"https://itea-cdn.qq.com/file/tgl/20190628/4134d9e2acb614ea98c12902490a8541.1561707086.1aea7d895e4c6afdca57e1547e6becfd.230x140_16538.jpg"},{"title":"我家李白不可能那么可爱31 夜猎1","preview":"https://shp.qpic.cn/cfwebcap/0/6a1420625349827f075de3b38d89ff3d/0/?width=230&height=140"},{"title":"沈括｜多观察小地图这事，800年前他就懂！","preview":"https://shp.qpic.cn/cfwebcap/0/952e1b385c626f1a6f54bf12d974c25a/0/?width=230&height=140"},{"title":"王者荣耀：第48章 苏烈大战钟馗，百里玄策巧妙助战","preview":"https://shp.qpic.cn/cfwebcap/0/7cd4951fdcf9a47779a8175fa73c7af1/0/?width=230&height=140"},{"title":"《创世王者》——第十章 长城之战四 清扫工作","preview":"https://shp.qpic.cn/cfwebcap/0/b0bfa37d5549734d96debd154358888b/0/?width=230&height=140"},{"title":"王者小漫画：戏精的虞姬，项羽很无奈","preview":"https://shp.qpic.cn/cfwebcap/0/27cdca796c0f520fbce6f61536d1cb51/0/?width=230&height=140"},{"title":"【COS偶像季】第40期：蜕变的天鹅公主——小乔","preview":"https://shp.qpic.cn/cfwebcap/0/0b2742a68d0c30046a9b751b2c1733ae/0/?width=230&height=140"},{"title":"绝密公布！五虎上将团照上线！C位英雄居然有五把武器？！","preview":"https://shp.qpic.cn/cfwebcap/0/b179d7510c7e2a1087c043766a972c3f/0/?width=230&height=140"},{"title":"同人文学：在路上——稷下学院的日常（番外一）{暑期篇}","preview":"https://shp.qpic.cn/cfwebcap/0/8006f57e49f156441ca43784b8644d04/0/?width=230&height=140"},{"title":"设计了一套稷下学院的现代风格校服","preview":"https://itea-cdn.qq.com/file/tgl/20190829/eacd38458cfba7d1012065af5c0141d4.1567058487.cd3eda659d3b0371dc9376e2ca4b0625.230x140_80409.png"},{"title":"司马懿：黑夜是刺客潜行最好掩护，但冲破黑暗也需你足够的勇气！","preview":"https://itea-cdn.qq.com/file/tgl/20190831/9c4e28a00fab8e6ff485c82daf7a1861.1567183527.a0dd21dbf3ca582cc920bc4d2f647d20.230x140_67799.JPG"},{"title":"西施：就这样开始吧，曜，接下来还请多多指教呦，谢谢你","preview":"https://itea-cdn.qq.com/file/tgl/20190828/3667f6a0c97490758d7dc9659d01ea34.1566958747.878a495b915f940ae21952408e90acdb.230x140_38067.jpg"},{"title":"【COS偶像季】第39期：青莲剑仙——李白","preview":"https://itea-cdn.qq.com/file/tgl/20190827/d63d9f8016e03a8d913cf6f4b6b1c02c.1566918578.b2f8d75c2c36b0383450330ed9fe1236.230x140_15097.jpg"},{"title":"我的稷下学院 第六章 我赌你枪里没有子弹","preview":"https://itea-cdn.qq.com/file/tgl/20190826/b6d767d2f8ed5d21a44b0e5886680cb9.1566806415.ede419ca10ee5ec66cde7d8ee4f77513.230x140_61786.png"}];
        //const xinshou = [{"title":"王者荣耀除了需要熟练度，常见细节技巧分享，高端局玩家都知道","preview":"https://itea-cdn.qq.com/file/tgl/20190713/cd53d53ef16137b6446a595b0c09b808.1562950751.0786380e3ce07bee8ce71cd7ee82f1e3.230x140_16668.jpg"},{"title":"王者荣耀：超强实战中路游走技巧，学好三大原则轻松上分","preview":"https://itea-cdn.qq.com/file/tgl/20190713/ccb3d22a44e997e6b33296013a6383b3.1562987847.75d1dc343f85e661887755df3db8ef76.230x140_20839.jpg"},{"title":"全英雄铭文搭配思路，干货教程-战士篇","preview":"https://itea-cdn.qq.com/file/tgl/20190709/4134d9e2acb614ea98c12902490a8541.1562656487.ad2289a391fbeb879ae38941f82af8bf.230x140_16538.jpg"},{"title":"全英雄铭文搭配思路，干货教程-刺客+辅助篇","preview":"https://itea-cdn.qq.com/file/tgl/20190710/0ac88cfa3358a41a848a0996ba2980d1.1562760261.c6b7c09ebef1df462c7df296aa94cc46.230x140_7096.jpg"},{"title":"鞋子作为6大神装之一，每人必出，但你真的对它研究过吗？","preview":"https://itea-cdn.qq.com/file/tgl/20190628/4134d9e2acb614ea98c12902490a8541.1561707086.1aea7d895e4c6afdca57e1547e6becfd.230x140_16538.jpg"},{"title":"王者荣耀：领悟装备中“唯一被动”的意思，别再被说不会出装了","preview":"https://shp.qpic.cn/cfwebcap/0/6a1420625349827f075de3b38d89ff3d/0/?width=230&height=140"},{"title":"王者荣耀：如何成为一名优秀的上单玩家？这十点意识你必须掌握！","preview":"https://shp.qpic.cn/cfwebcap/0/952e1b385c626f1a6f54bf12d974c25a/0/?width=230&height=140"},{"title":"王者荣耀：常用铭文搭配，真的很详细啦","preview":"https://shp.qpic.cn/cfwebcap/0/7cd4951fdcf9a47779a8175fa73c7af1/0/?width=230&height=140"}];
        //const yx = [{"title":"女王出品 | 为肉辅发声！辅助类型与肉辅玩法全解析","preview":"https://itea-cdn.qq.com/file/tgl/20190713/22c25c4f633efd5c33709cc12e60ac9b.1562949914.01a72a26af86b805b1cbde5c6fda25fe.230x140_18586.jpg"},{"title":"新赛季辅助上分优选，没有坦克选廉颇，选孙膑不用看阵容","preview":"https://itea-cdn.qq.com/file/tgl/20190713/cd53d53ef16137b6446a595b0c09b808.1562950751.0786380e3ce07bee8ce71cd7ee82f1e3.230x140_16668.jpg"},{"title":"S16上分法师首选诸葛亮，安琪拉一控到死，她团控全场！","preview":"https://itea-cdn.qq.com/file/tgl/20190713/ccb3d22a44e997e6b33296013a6383b3.1562987847.75d1dc343f85e661887755df3db8ef76.230x140_20839.jpg"},{"title":"世冠上路都用啥？孙策橘右京已经不是首选，最强势的根本猜不到","preview":"https://itea-cdn.qq.com/file/tgl/20190709/4134d9e2acb614ea98c12902490a8541.1562656487.ad2289a391fbeb879ae38941f82af8bf.230x140_16538.jpg"},{"title":"S16一个合格辅助需要完成的六件事，能全部完成的不超过10%！","preview":"https://itea-cdn.qq.com/file/tgl/20190710/0ac88cfa3358a41a848a0996ba2980d1.1562760261.c6b7c09ebef1df462c7df296aa94cc46.230x140_7096.jpg"},{"title":"Hero兵法讲堂：刺客篇","preview":"https://itea-cdn.qq.com/file/tgl/20190628/4134d9e2acb614ea98c12902490a8541.1561707086.1aea7d895e4c6afdca57e1547e6becfd.230x140_16538.jpg"},{"title":"王者荣耀：射手遇到兰陵王都颤抖？，这几位却让他有来无回","preview":"https://shp.qpic.cn/cfwebcap/0/6a1420625349827f075de3b38d89ff3d/0/?width=230&height=140"},{"title":"营地数据榜：射手榜首易主，狄仁杰微调第二都没保住，他后来居上","preview":"https://shp.qpic.cn/cfwebcap/0/952e1b385c626f1a6f54bf12d974c25a/0/?width=230&height=140"},{"title":"王者荣耀：最考验意识的三位辅助，新手玩不好，大神当成宝！","preview":"https://shp.qpic.cn/cfwebcap/0/7cd4951fdcf9a47779a8175fa73c7af1/0/?width=230&height=140"},{"title":"王者荣耀：射手出肉会更强？打惯了输出装的，不妨来看看吧！","preview":"https://shp.qpic.cn/cfwebcap/0/b0bfa37d5549734d96debd154358888b/0/?width=230&height=140"},{"title":"上分秘诀之射手，站桩射手的三件法宝！后羿实战打法简介！","preview":"https://shp.qpic.cn/cfwebcap/0/27cdca796c0f520fbce6f61536d1cb51/0/?width=230&height=140"},{"title":"草丛两个小可爱喜迎增强，妲己安琪拉下限再次提升，中路上分首选","preview":"https://shp.qpic.cn/cfwebcap/0/0b2742a68d0c30046a9b751b2c1733ae/0/?width=230&height=140"}];
        const guanfang = [{"title":"马超：兄弟的热血不会白流，西凉的纯洁我来守护","preview":"https://itea-cdn.qq.com/file/tgl/20190713/ccb3d22a44e997e6b33296013a6383b3.1562987847.75d1dc343f85e661887755df3db8ef76.230x140_20839.jpg"},{"title":"王者荣耀首批金牌特权门店现已上线","preview":"https://itea-cdn.qq.com/file/tgl/20190709/4134d9e2acb614ea98c12902490a8541.1562656487.ad2289a391fbeb879ae38941f82af8bf.230x140_16538.jpg"},{"title":"吃喝玩 赚一夏 来王者人生享暑期豪礼！","preview":"https://itea-cdn.qq.com/file/tgl/20190710/0ac88cfa3358a41a848a0996ba2980d1.1562760261.c6b7c09ebef1df462c7df296aa94cc46.230x140_7096.jpg"},{"title":"英雄故事 | 孙膑：为了我的挚友，流动吧，时间之力！","preview":"https://itea-cdn.qq.com/file/tgl/20190628/4134d9e2acb614ea98c12902490a8541.1561707086.1aea7d895e4c6afdca57e1547e6becfd.230x140_16538.jpg"},{"title":"云中君vs瑶：隔着一颗眼泪，也看不清生死的羁绊","preview":"https://shp.qpic.cn/cfwebcap/0/6a1420625349827f075de3b38d89ff3d/0/?width=230&height=140"},{"title":"中二少年的独白：我就是想证明自己","preview":"https://shp.qpic.cn/cfwebcap/0/952e1b385c626f1a6f54bf12d974c25a/0/?width=230&height=140"},{"title":"王者世界观体验站更新！绝密档案已曝光","preview":"https://shp.qpic.cn/cfwebcap/0/7cd4951fdcf9a47779a8175fa73c7af1/0/?width=230&height=140"},{"title":"英雄故事 | 曜-星辰之子","preview":"https://shp.qpic.cn/cfwebcap/0/b0bfa37d5549734d96debd154358888b/0/?width=230&height=140"}];
        const parent = await Category.findOne({
            name:'官方'
        })
        const list = guanfang.map(el=>{
            return{
                categories:[parent],
                title:el.title,
                preview:el.preview,
                date:'2019-07-12',
                body:'',
            }
        })
        await Walkthrough.insertMany(list);
        req.send(list);
    })

    //获取数据接口
    router.get('/walkthrough/list',async(res,req)=>{
        const parent = await Category.findOne({
            name:'图文攻略'
        });
        const cats = await Category.aggregate([
            {$match:{parent:parent._id}},
            {
                $lookup:{
                    from:'walkthroughs',
                    localField:'_id',
                    foreignField:'categories',
                    as:'walkthroughList'
                }
            }
        ])
        req.send(cats)
    })


    app.use('/web/api',router);
}