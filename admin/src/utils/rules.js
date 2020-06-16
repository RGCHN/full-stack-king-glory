// 验证密码   密码，长度在6~18之间，只能包含字母、数字和下划线
export function isValidPass(rule,str,callback) {
    const reg = /\w{6,18}$/;
    if(str===" "){
        callback(new Error('请输入密码'));
    }else if(reg.test(str)){
        callback();
    }else{
        callback(new Error('6-18位字母、数字或下划线的组合'))
    }
}



//   验证用户名  用户名要求 数字、字母、下划线的组合，其中数字和字母必须同时存在*
export function isValidUsername(rule,str,callback) {
    const reg = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z_]{3,12}$/;
    if(str===' '){
        callback(new Error('请输入用户名'));
    }else if(reg.test(str)){
        callback();
    }else{
        callback(new Error('3-12位数字、字母、下划线的组合， 数字和字母必须同时存在'))
    }
}

export default {
    username:[{required:true,validator:isValidUsername,trigger:'change'}],
    password:[{required:true,validator:isValidPass,trigger:'blur'}],
    phone:[{required:true,pattern:/^1[34578]\d{9}$/,message:'仅支持中国大陆手机号',trigger:'blur'}]
}