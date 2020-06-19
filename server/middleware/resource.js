module.exports = options => {
    return async (req, res, next) => {
        //匹配路由参数中的resource
        const modelName = require('inflection').classify(req.params.resource)
        //设置对应的数据模型
        req.Model = require(`../models/${modelName}`)
        next()
    }
}