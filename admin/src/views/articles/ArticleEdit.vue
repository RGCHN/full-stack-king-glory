<template>
    <div id="articleEdit">
        <h1>{{id?'编辑':'新建'}}文章</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model="model.categories" multiple>
                    <el-option v-for="item in categories" :key="item._id"
                    :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <vue-editor useCustomImageHandler @image-added="handleImageAdded"  v-model="model.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {VueEditor} from "vue2-editor"

    export default {
        name: "CategoryEdit",
        props:{id:{type:String}},
        components:{
          VueEditor
        },
        data(){
            return {
                model:{},
                parents:[],
                categories:[],
            }
        },
        methods:{
            async save(){
                let res;
                //根据有无id判断是新建还是编辑分类
                if(this.id){
                    res = await this.$http.put(`rest/articles/${this.id}`,this.model);
                }else{
                    res = await this.$http.post('rest/articles',this.model);
                }

                //创建完毕后跳转到分类列表
                await  this.$router.push('/articles/list');
                this.$message({
                    type:'success',
                    message:'保存成功！'
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/articles/${this.id}`);
                this.model = res.data;
            },
            async fetchCategories(){
                const res = await this.$http.get('rest/categories');
                this.categories = res.data.slice(0).filter(el=>el.parent&&el.parent.name==='新闻资讯');
            },
            async handleImageAdded(file,Editor,cursorLocation,resetUploader){
                const formData = new FormData();
                formData.append("file", file);
                const res = await this.$http.post('upload',formData);
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
            },
        },
        created() {
            //id存在 则执行fetch方法以获取后台存储的data并显示
            this.id && this.fetch()
            this.fetchCategories();
        }
    }
</script>

<style scoped>

</style>