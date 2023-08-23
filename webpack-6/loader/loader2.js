function loader(source){
    console.log(2)
    return source
}

loader.pitch = function(){
    return 'ok'
}

module.exports = loader