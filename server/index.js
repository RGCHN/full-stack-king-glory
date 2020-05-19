const express = require("express")
//定义express实例
const app = express();

app.use(express.json());
//解决跨域问题
app.use(require('cors')());
//托管静态文件 uploads下的文件都是静态文件
app.use('/uploads',express.static(__dirname + '/uploads'));
//设置token的密钥
app.set('secret','fdshjfhs');

require('./routes/admin')(app);
require('./plugins/db,')(app);

app.listen(3000,()=>{
    console.log('App listening on port 3000');
})
