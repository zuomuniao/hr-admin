import fs from 'fs'
//封装了一个返回值是promise实例的函数 用来读文件
function read (path) {
    return new Promise((resolve, reject) => {
        fs.readFile('./file/' + path, 'utf-8', (err, data) => {
            if (err) return reject(err.message)
            resolve(data)
        })
    })
}

read('1.txt')
    .then(function (res1) {
        console.log(res1);
        return read('2.txt')
    })
    .then(function (res2) {
        console.log(res2);
        return read('3.txt')
    })
    .then(function (res3) {
        console.log(res3);
    })