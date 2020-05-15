const express = require("express")
//定义express实例
const app = express();

app.use(express.json());
app.use(require('cors')());

require('./routes/admin')(app);
require('./plugins/db,')(app);

app.listen(3000,()=>{
    console.log('App listening on port 3000');
})
