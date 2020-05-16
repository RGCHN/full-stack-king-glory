<template>
    <div class="itemEdit">
        <h1>{{id?'编辑':'新建'}}物品</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :on-success="afterUpload">
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "itemEdit",
        props:{
            id:{}
        },
        data(){
            return{
                model:{}
            }
        },
        methods:{
            afterUpload(res){
                //vue提供的修改model的值的语法 防止响应式未生效 res是服务端返回的响应
                this.$set(this.model,'icon',res.url);
            },
            async save(){
                let res;
                //根据有无id判断是新建还是编辑分类
                if(this.id){
                    res = await this.$http.put(`rest/items/${this.id}`,this.model);
                }else{
                    res = await this.$http.post('rest/items',this.model);
                }

                //创建完毕后跳转到分类列表
                await  this.$router.push('/items/list');
                this.$message({
                    type:'success',
                    message:'保存成功！'
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/items/${this.id}`);
                this.model = res.data;
            },
        },
        created() {
            this.id && this.fetch()
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>