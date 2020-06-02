<template>
    <div class="vd-list">
        <h1>视频列表</h1>
        <el-table :data="videos">
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="_id" label="ID"></el-table-column>
            <el-table-column prop="date" label="时间"></el-table-column>
            <el-table-column prop="playTimes" label="播放量"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            type="primary" size="small"
                            @click="$router.push(`/video/edit/${scope.row._id}`)">编辑</el-button>
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
        name: "VideoList",
        data(){
           return{
               videos:[]
           }
        },
        methods:{
            async fetch(){
                const res = await this.$http.get('rest/videos');
                this.videos = res.data;
                for(let v of this.videos){
                    if(!v.playTimes){
                        v.playTimes = 0
                    }
                }
            },
            async remove(row){
                this.$confirm(`是否确定要删除分类 ${row.name} ?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`rest/videos/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    await this.fetch();
                })
            }
        },
        created() {
            this.fetch();
        }
    }
</script>

<style scoped>

</style>