<template>
    <div class="HeroEdit">
        <h1>{{id?'编辑':'新建'}}英雄</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-tabs type="border-card" value="skills">
                <el-tab-pane label="基础信息">
                    <el-form-item label="名称" style="margin-top: 2rem">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>

                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>

                    <el-form-item label="头像">
                        <el-upload
                                class="avatar-uploader"
                                :action="$http.defaults.baseURL + '/upload'"
                                :show-file-list="false"
                                :on-success="afterUpload">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="角色类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option v-for="item in categories" :key="item._id"
                                       :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="难度">
                        <el-rate :max="10" show-score v-model="model.scores.difficult"
                                 style="margin-top:0.7rem"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate :max="10" show-score v-model="model.scores.skills"
                                 style="margin-top:0.7rem"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate :max="10" show-score v-model="model.scores.attack"
                                 style="margin-top:0.7rem"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate :max="10" show-score v-model="model.scores.survive"
                                 style="margin-top:0.7rem"></el-rate>
                    </el-form-item>

                    <el-form-item label="顺风出装">
                        <el-select v-model="model.item1" multiple>
                            <el-option v-for="item in items" :key="item._id"
                                       :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="逆风出装">
                        <el-select v-model="model.item2" multiple>
                            <el-option v-for="item in items" :key="item._id"
                                       :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"/>
                    </el-form-item>

                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"/>
                    </el-form-item>

                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"/>
                    </el-form-item>

                </el-tab-pane>
                <el-tab-pane label="技能信息" name="skills">
                    <el-button size="small" @click="model.skills.push({})">
                        <i class="el-icon-plus"></i>  添加技能
                    </el-button>
                    <el-row type="flex" style="flex-wrap: wrap;margin-top:2rem">
                        <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                        class="avatar-uploader"
                                        :action="uploadUrl"
                                        :headers="getAuthHeaders()"
                                        :show-file-list="false"
                                        :on-success="res => $set(item,'icon',res.url)">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                 <el-input v-model="item.description" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="小提示">
                                <el-input v-model="item.tips" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="danger" @click="model.skills.splice(index,1)">
                                    删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top: 1rem">
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "heroEdit",
        props:{
            id:{}
        },
        data(){
            return{
                model:{
                    name:'',
                    avatar:'',
                    scores:{
                        difficult: 0,
                    },
                    skills:[],
                },
                categories:[],
                items:[],
            }
        },
        methods:{
            afterUpload(res){
                //在定义数据时把属性定义好了 就不会发生响应式失效 可以用普通赋值方式
                this.model.avatar = res.url;
            },
            async save(){
                let res;
                //根据有无id判断是新建还是编辑分类
                if(this.id){
                    res = await this.$http.put(`rest/hero/${this.id}`,this.model);
                }else{
                    res = await this.$http.post('rest/hero',this.model);
                }

                //创建完毕后跳转到分类列表
                await  this.$router.push('/hero/list');
                this.$message({
                    type:'success',
                    message:'保存成功！'
                })
            },
            async fetch(){
                const res = await this.$http.get(`rest/hero/${this.id}`);
                //防止定义的空数组被服务端的数据覆盖 而是把服务端数据添加到model中（没有的属性添加） 造成找不到属性的错误
                this.model = Object.assign({},this.model,res.data)
            },
            async fetchCategories(){
                //请求分类列表 确定英雄的类型选项有哪些
                const res = await this.$http.get(`rest/categories`);
                this.categories = res.data;
            },
            async fetchItems(){
                const res = await this.$http.get(`rest/items`);
                this.items = res.data;
            }
        },
        created() {
            this.id && this.fetch();
            this.fetchCategories();
            this.fetchItems();
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
        width: 5rem;
        height: 5rem;
        line-height: 5rem;
        text-align: center;
    }
    .avatar {
        width: 5rem;
        height: 5rem;
        display: block;
    }
</style>