// 手机号验证
export function isValidPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(str);
}

// 验证密码   密码，长度在6~18之间，只能包含字母、数字和下划线
export function isValidPass(str) {
    const reg = /\w{6,18}$/;
    return reg.test(str);
}

//   验证用户名  用户名要求 数字、字母、下划线的组合，其中数字和字母必须同时存在*
export function isValidUsername(str) {
    const reg = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z_]{3,12}$/;
    return reg.test(str);
}