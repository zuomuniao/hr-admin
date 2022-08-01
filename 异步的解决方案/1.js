import fs from 'fs'
// callback的写法的，会导致回调地狱 callbak hell
fs.readFile('./file/1.txt', 'utf-8', (err, data) => {
    if (err) return console.log(err.message);
    console.log(data);
    fs.readFile('./file/2.txt', 'utf-8', (err, data) => {
        if (err) return console.log(err.message);
        console.log(data);
        fs.readFile('./file/3.txt', 'utf-8', (err, data) => {
            if (err) return console.log(err.message);
            console.log(data);
        })
    })
})
