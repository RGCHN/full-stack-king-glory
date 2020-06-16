<template>
    <div id="list">
        <h1>分类列表</h1>
        <el-table :data="items" style="width: 100%;margin-bottom: 20px;"
                  border
                  row-key="_id"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
            <el-table-column prop="_id" label="ID"></el-table-column>
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

    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        data(){
            return{
                items:[],
            }
        },
        methods:{
            async fetch(){
                const res = await this.$http.get('rest/categories');
                const temp = res.data;
                for(let t of temp){
                    if(t.parent===undefined){
                        this.items.push({name:t.name,_id:t._id,children:[]});
                    }else{
                        for(let i of this.items){
                            if(i.name === t.parent.name){
                                i.children.push({name:t.name, _id:t._id})
                            }
                        }
                    }
                }
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

        },
        created() {
            this.fetch();
        }
    }
</script>

<style lang="scss">
    .el-collapse-item__header{
        font-weight: bold;
        background-color: #eeeeee;
    }
    .el-collapse-item__wrap{
        min-height: 300px;
    }

</style>