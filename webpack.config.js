const path = require('path')


//配置文件，js文件，向外暴露了一个配置对象
module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output: {
        //输出文件的配置
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    }
}