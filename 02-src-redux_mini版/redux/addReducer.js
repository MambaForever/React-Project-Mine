// 服务于Add组件的reducer函数

// let initState = 0
// export default function (preState=initState,action) {

export default function (preState,action) {
  // 解构赋值传来的action对象
  let {type,data} = action
  let newState
  switch (type) {
    case 'increment':
      newState = preState + data
      return newState
    case 'decrement':
      newState = preState - data
      return newState
  
    default:  // 初始化时才会走default
      return preState = preState===undefined ? 0 : preState
  }
}
