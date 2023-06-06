// console.log('index')

// class Log {
//     constructor() {
//         console.log('error')
//     }
// }

// new Log()


// let xhr = new XMLHttpRequest()

// xhr.open('GET', '/api/user', true)

// xhr.onload = function() {
//     console.log(xhr.response)
// }

// xhr.send()

// import 'bootstrap'
// import './style'


let url = '';
if(DEV != 'production'){
    url = 'http://localhost:3000'
}else{
    url = 'http://localhost:80'
}
console.log(url, '---', DEV)