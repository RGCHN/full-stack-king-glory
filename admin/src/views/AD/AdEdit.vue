<template>
    <div id="AdEdit">
        <h1>{{id?'编辑':'新建'}}广告位</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <el-button size="small" @click="model.items.push({})">
                    <i class="el-icon-plus"></i> 添加广告
                </el-button>
                <el-row type="flex" style="flex-wrap: wrap;">
                    <el-col :md="24" v-for="(item,index) in model.items" :key="index">
                        <el-form-item label="跳转链接" style="margin-top:2rem">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图标" style="margin-top: 0.5rem;">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="uploadUrl"
                                    :headers="getAuthHeaders()"
                                    :show-file-list="false"
                                    :on-success="res => $set(item,'image',res.url)">
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="danger" @click="model.items.splice(index,1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: "AdEdit",
        props:{
        id:{}
        },
        data(){
            return {
                model:{
                    items:[],
                },
            }
        },
        methods:{
            async save(){
                let res;
                //根据有无id判断是新建还是编辑分类
                if(this.id){
                    res = await this.$http.put(`rest/ads/${this.id}`,this.model);
                }else{
                    res = await this.$http.post('rest/ads',this.model);
                }

                //创建完毕后跳转到分类列表
                await this.$router.push('/ads/list');
                this.$message({
                    type:'success',
                    message:'保存成功！'
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/ads/${this.id}`);
                this.model = Object.assign({},this.model,res.data);
            },
        },
        created() {
            //id存在 则执行fetch方法以获取后台存储的data并显示
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
        font-size:28px;
        color: #8c939d;
        min-width: 5rem;
        height: 5rem;
        line-height: 5rem;
        text-align: center;
    }
    .avatar {
        min-width: 5rem;
        height: 5rem;
        display: block;
    }
</style>