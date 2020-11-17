// promise 是 es 中的一个新的对象
//  作用：一般用来解决回调地狱
// 需求：
//  有三个 txt 文件，我们要依次将文件中的内容读取出来
//      a 读完之后再读 b, b 完成之后再读取 c
// 导入 fs 核心模块
const fs = require('fs')
// ----------------1.0 多层嵌套：回调地狱----------------------
// fs.readFile('./a.txt', 'utf-8', (errora, filea) => {
//   if (errora) return
//   console.log(filea)
//   fs.readFile('./b.txt', 'utf-8', (errorb, fileb) => {
//     if (errorb) return
//     console.log(fileb)
//     fs.readFile('./c.txt', 'utf-8', (errorc, filec) => {
//       if (errorc) return
//       console.log(filec)
//     })
//   })
// })
// ----------------2.0 将代码封装成为 promise -------------------
// // 将读取 a 文件封装为 promise 对象
// var pa = new Promise((resolve, reject) => {
//   fs.readFile('./a.txt', 'utf-8', (errora, filea) => {
//     if (errora) {
//       return reject(errora)
//     }
//     resolve(filea)
//   })
// })
// // 将读取 b 文件封装为 promise 对象
// var pb = new Promise((resolve, reject) => {
//   fs.readFile('./b.txt', 'utf-8', (errorb, fileb) => {
//     if (errorb) {
//       return reject(errorb)
//     }
//     resolve(fileb)
//   })
// })
// // 将读取 b 文件封装为 promise 对象
// var pc = new Promise((resolve, reject) => {
//   fs.readFile('./c.txt', 'utf-8', (errorc, filec) => {
//     if (errorc) {
//       return reject(errorc)
//     }
//     resolve(filec)
//   })
// })

// pa.then(res => {
//   console.log(res) // a
//   return pb
// })
//   .then(res => {
//     console.log(res) // b
//     return pc
//   })
//   .then(res => {
//     console.log(res) // c
//   })

// 3.0 ---------------将读取的操作封装为一个函数----------------------------
function getPromise (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (errorb, fileb) => {
      if (errorb) {
        return reject(errorb)
      }
      resolve(fileb)
    })
  })
}
// 得到三个 promise 对象
getPromise('./a.txt')
  .then(res => {
    console.log(res)
    return getPromise('./b.txt')
  })
  .then(res => {
    console.log(res)
    return getPromise('./c.txt')
  })
  .then(res => {
    console.log(res)
  })
