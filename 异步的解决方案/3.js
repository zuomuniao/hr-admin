import fs from 'fs'
import co from 'co'
//封装了一个返回值是promise实例的函数 用来读文件
function read (path) {
    return new Promise((resolve, reject) => {
        fs.readFile('./file/' + path, 'utf-8', (err, data) => {
            if (err) return reject(err.message)
            resolve(data)
        })
    })
}

// 历史是先有generator,很久以后才能async,await
co(function* fn () {
    const r1 = yield read('1.txt')
    console.log(r1);
    const r2 = yield read('2.txt')
    console.log(r2);
    const r3 = yield read('3.txt')
    console.log(r3);
})


async function fn () {
    const r1 = await read('1.txt')
    console.log(r1);
    const r2 = await read('2.txt')
    console.log(r2);
    const r3 = await read('3.txt')
    console.log(r3);
}

// var g = fn()
// g.next().value.then(function (res) {
//     console.log(res);
//     g.next().value.then(function (res) {
//         console.log(res);
//         g.next().value.then(function (res) {
//             console.log(res);
//         })
//     })
// })
