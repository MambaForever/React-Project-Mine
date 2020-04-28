// 向后台发送请求的函数库

import ajax from './ajax'


// 向后台发送登录请求
let postLogin = userInfo => ajax.post('/login',userInfo)



// 向外暴露发送请求的函数
export {postLogin}