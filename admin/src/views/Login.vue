<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form  @submit.native.prevent :rules="rules" :model="model">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit" @click="register">注册</el-button>
                    <el-button type="primary" native-type="submit" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                model:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[{ required: true, message: '请输入用户名', trigger: 'blur' },
                                { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }],
                    password: {required:true,message:'请输入密码',trigger:'blur'}
                }
            }
        },
        methods:{
            async login(){
                const res = await this.$http.post('login',this.model);
                localStorage.token = res.data.token;
                this.$router.push('/');
                this.$message({
                    type:'success',
                    message:'登录成功'
                })
            },
            async register(){
                const res = await this.$http.post('register',this.model);
                if(res.data.flag){
                    this.$message({
                        type:'success',
                        message:'注册成功'
                    })
                }else{
                    this.$message({
                        type:'warning',
                        message:'已存在用户名，请重新注册'
                    })
                }

            }
        }
    }
</script>

<style scoped>
    .login-card{
        width: 25rem;
        margin: 5rem auto;
        text-align: center;
    }

</style>