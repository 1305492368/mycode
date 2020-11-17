// 需求：
//  有三个 txt 文件，我们要依次将文件中的内容读取出来
//      a 读完之后再读 b, b 完成之后再读取 c
// 导入 fs 核心模块
const fs = require('fs')

// 封装 promise 对象
function getPromise (path) { // axios
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (errorb, fileb) => {
      if (errorb) {
        return reject(errorb)
      }
      resolve(fileb)
    })
  })
}

// 4.0 使用 async & await 来改造代码
//  async 用来修饰异步代码所在的函数
//  await 用来修饰异步代码（必须返回一个 promise 对象）
async function readFile () {
    // 读取 a
    const resa = await getPromise('./a.txt')
    console.log(resa)
    // 读取 b
    const resb = await getPromise('./b.txt')
    console.log(resb)
    // 读取 c
    const resc = await getPromise('./c.txt')
    console.log(resc)
}

readFile()

// 说明：
//  nodejs
//      应用：
//          安装 nodejs => NPM
//          安装第三方包： npm i 等相关的指令
//          大概了解一些核心模块的使用： fs path url
//      概念：
//          nodejs 是基于 chorem v8 引擎的一个后端语言（可以用来书写服务器代码）
//          一般情况下前端拿用来制作工作