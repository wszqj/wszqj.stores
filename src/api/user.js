//用户登录
import request from "@/utils/request.js";

//用户登录
export const userLoginService = (loginData) => {
    // 借助于URLSearchParams完成传递
    const params = new URLSearchParams()
    //遍历参数，将数据放在params中
    for (let key in loginData) {
        params.append(key, loginData[key])
    }
    return request.post('/user/login', params)
}

//用户注册
export const userRegisterService = (registerData) => {
    // 借助于URLSearchParams完成传递
    const params = new URLSearchParams()
    //遍历参数，将数据放在params中
    for (let key in registerData) {
        params.append(key, registerData[key])
    }
    return request.post('/user/register', params)
}
