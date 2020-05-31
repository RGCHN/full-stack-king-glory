<template>
    <div id="list">
        <h1>分类列表</h1>
        <el-collapse>
            <el-collapse-item v-for="(pt,index) in parentTitle" :title="pt.name" :key="index" :name="index">
                <el-table :data="getSubCategory(pt)">
                    <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
                    <el-table-column prop="_id" label="ID"></el-table-column>
                    <!--<el-table-column prop="parent.name" label="上级分类"></el-table-column>-->
                    <el-table-column fixed="right" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button
                                    type="primary" size="small"
                                    @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
                            <el-button
                                    type="primary" size="small"
                                    @click="remove(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>

    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        data(){
            return{
                items:[],
                parentTitle:[],
            }
        },
        methods:{
            async fetch(){
                const res = await this.$http.get('rest/categories');
                this.items = res.data;
                this.parentTitle = this.items.filter(el=>!el.parent);
            },
            async remove(row){
                this.$confirm(`是否确定要删除分类 ${row.name} ?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`rest/categories/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    await this.fetch();
                })
            },
            getSubCategory(parent){
                return this.items.filter(item=>item.parent&&item.parent._id===parent._id);
            },

        },
        created() {
            this.fetch();
        }
    }
</script>

<style scoped>

</style>