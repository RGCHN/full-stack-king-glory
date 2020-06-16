<template>
    <div class="register-container">
        <el-card header="注册账号" class="register-card">
            <el-form  @submit.native.prevent :model="model" ref="registerForm">
                <el-form-item label="用户名" prop="username" :rules="rule.username">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="rule.password">
                    <el-input type="password" v-model="model.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword" :rules="checkPassRule">
                    <el-input type="password" v-model="model.checkPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit" @click="register('registerForm')">注册</el-button>
                    <el-button @click="resetForm('registerForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-button type="text" @click="toLogin">已有账号？去登录 >></el-button>
        </el-card>
    </div>
</template>

<script>
    import rules from "../utils/rules";
    export default {
        name: "Register",
        data(){
            let checkPass = ((rule,str,callback)=>{
                if(str===' '){
                    callback(new Error('请再次输入密码'));
                }else if(str!==this.model.password){
                     callback(new Error('两次输入的密码不一致'))
                }else{
                    callback();
                }
            })
            return {
                rule:rules,
                model:{
                    username:'',
                    password:'',
                    checkPassword:'',
                },
                checkPassRule:[{required:true,validator:checkPass,trigger:'blur'}]
            }
        },
        methods:{
            resetForm(name){
              this.$refs[name].resetFields();
            },
            toLogin(){
              this.$router.push('/login')
            },
            register(modelName){
                this.$refs[modelName].validate((valid)=>{
                    if(valid){
                        this.getResult();
                    }else{
                        this.$message({
                            type:'error',
                            message:'输入有误，请重新输入'
                        })
                        this.$refs.registerForm.resetFields();
                    }
                })
            },
            async getResult(){
                const res = await this.$http.post('register',this.model);
                if(res.data.flag){
                    this.$message({
                        type:'success',
                        message:'注册成功'
                    })
                    this.toLogin();
                }else{
                    this.$message({
                        type:'warning',
                        message:'已存在用户名，请重新注册'
                    })
                    this.$refs.registerForm.resetFields();
                }
            }
        }
    }
</script>

<style >
    .register-card{
        width: 25rem;
        margin: 5rem auto;
        text-align: center;
    }


</style>