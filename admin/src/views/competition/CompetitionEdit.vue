<template>
    <div id="competitionEdit">
        <h1>{{id?'编辑':'新建'}}赛事</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label="赛事类别">
                <el-select v-model="model.categories">
                    <el-option v-for="item in categories" :key="item._id"
                               :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="赛事名">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="预览图">
                <el-upload
                        class="preview-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="afterUpload">
                    <img v-if="model.image" :src="model.image" class="preview">
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
        name: "CompetitionEdit",
        props:{id:{type:String}},
        data(){
            return{
                model:{},
                parent:[],
                categories:[],
            }
        },
        methods:{
            afterUpload(res){
                this.$set(this.model,'image',res.url);
            },
            async save(){
                let res;
                //根据有无id判断是新建还是编辑分类
                if(this.id){
                    res = await this.$http.put(`rest/competition/${this.id}`,this.model);
                }else{
                    res = await this.$http.post('rest/competition',this.model);
                }

                //创建完毕后跳转到分类列表
                await  this.$router.push('/competition/list');
                this.$message({
                    type:'success',
                    message:'保存成功！'
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/competition/${this.id}`);
                this.model = res.data;
            },
            async fetchCategories(){
                const res = await this.$http.get('rest/categories');
                this.categories = res.data.slice(0).filter(el=>el.parent&&el.parent.name==='赛事');
            },

        },
        created() {
            this.id && this.fetch()
            this.fetchCategories();
        }

    }
</script>

<style >
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
        width: 375px;
        height: 210px;
        display: block;
    }

</style>