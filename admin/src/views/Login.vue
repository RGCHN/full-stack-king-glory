<template>
    <div class="login-container">
        <el-card header="登录账号" class="login-card">
            <el-form  @submit.native.prevent :rules="rules" :model="model" ref="loginForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
            <el-button class="toRegister" type='text' @click="toRegister">没有账号？去注册 >></el-button>
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
                    username:[{ required: true, message: '请输入用户名', trigger: 'change' },
                                { min:3, max:12, message: '3到12个字符', trigger: 'change' }],
                    password: {required:true,message:'请输入密码',trigger:'blur'}
                },
            }
        },
        methods:{
            toRegister(){
              this.$router.push('/register');
            },
            async login(){
                const res = await this.$http.post('login',this.model);
                localStorage.token = res.data.token;
                this.$router.push('/');
                this.$message({
                    type:'success',
                    message:'登录成功'
                })
            },

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