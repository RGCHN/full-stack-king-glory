<template>
    <div class="vd-edit">
        <h1>{{id?'编辑':'新建'}}视频</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="标题">
                <el-input v-model="videos.title"></el-input>
            </el-form-item>

            <el-form-item label="视频链接">
                <el-input v-model="videos.hyperlink"></el-input>
            </el-form-item>

            <el-form-item label="播放量">
                <el-input v-model="videos.playTimes"></el-input>
            </el-form-item>

            <el-form-item label="视频分类">
                <el-select v-model="videos.categories" multiple>
                    <el-option v-for="item in categories" :key="item._id"
                               :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="日期">
                <el-date-picker
                        v-model="videos.date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="预览图">
                <el-upload
                        class="preview-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="afterUpload">
                    <img v-if="videos.preview" :src="videos.preview" class="preview">
                    <i v-else class="el-icon-plus preview-uploader-icon"></i>
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
        name: "VideoEdit",
        data(){
          return {
            videos:{},
            categories:[],
          }
        },
        props:{
            id:{}
        },
        methods:{
            afterUpload(res){
                //vue提供的修改model的值的语法 防止响应式未生效 res是服务端返回的响应
                this.$set(this.videos,'preview',res.url);
            },
            async save(){
                let res;
                if(this.id){
                    res = await this.$http.put(`rest/videos/${this.id}`,this.videos);
                }else{
                    res = await this.$http.post('rest/videos',this.videos);
                }

                //创建完毕后跳转到分类列表
                await  this.$router.push('/video/list');
                this.$message({
                    type:'success',
                    message:'保存成功！'
                })
            },
            async fetch(){
                const res =await this.$http.get(`/rest/videos/${this.id}`);
                this.videos = res.data;
                console.log(res.data);
            },
            async fetchCategories(){
                //请求分类列表 确定英雄的类型选项有哪些
                const res = await this.$http.get(`rest/categories`);
                this.categories = res.data.slice(0).filter(el=> el.parent&&el.parent.name==='视频');
            },

        },
        created(){
          this.id&&this.fetch();
          this.fetchCategories();
        }
    }
</script>

<style>
    .preview-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .preview-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .preview-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 230px;
        height: 140px;
        line-height: 140px;
        text-align: center;
    }
    .preview {
        width: 230px;
        height: 140px;
        display: block;
    }

</style>