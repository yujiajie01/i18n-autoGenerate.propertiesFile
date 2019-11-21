var fs = require('fs');
var untils = require('./httpUtiles')
var fs = require('fs');
var readline = require('readline');


var readfilePath = 'vecon.properties'
// var lang = 'en_US'
// var lang = 'ko_KR'
// var lang = 'fr_FR'
var lang = 'zh_TW'



function readFile(cb) {

    //定义分割后每个文件的行数
    var rows = 2000;
    //要分割的文件
    // var file = 'sunqizheng.txt';
    //用来存储结果的变量
    var arr = [];

    //创建文件流
    var readstream = fs.createReadStream(readfilePath);
    //创建逐行读取
    var rl = readline.createInterface({
        input: readstream
    })

    rl.on('line', function (data) {
        arr.push(data);
    }).on('close', function () { //结束后调用的
        // for (var i = 0; i < Math.ceil(arr.length / rows); i++) {
        //     fs.writeFile(i + '.txt', arr.slice(i * rows, i * rows + rows).join('\r\n'));
        // }
        cb(arr)
    })




}

function writeFile(data) {

    var msg = ''
    for (var i = 0; i < data.length; i++) {
        msg = msg + '  \n ' + data[i]
    }
    fs.writeFile(readfilePath.split('.')[0] + '_' + lang + '.' + readfilePath.split('.')[1], msg, 'utf8', function (err) {
        if (err)
            console.log('写文件出错了，错误是：' + err);
        else
            console.log('ok');
    })
}


function main() {
    let arrx = []
    let arry = []
    let text = ''
    readFile(function (arr) {
        // data
        for (var i = 0; i < arr.length; i++) {
            arrx.push(arr[i].split("=")[0])
            arry.push(arr[i].split("=")[1])
        }
        for (var i = 0; i < arrx.length; i++) {
            if (arrx[i] == '') {
                arrx.splice(i, 1);
            }
            if (arrx[i].indexOf('#') != -1) {
                arrx.splice(i, 1);
            }
        }
        console.log("arry-o", arry)
        for (var i = 0; i < arry.length; i++) {
            if (typeof arry[i] == 'undefined') {
                arry.splice(i, 1);
            }
        }
        console.log("arry-splice", arry)
        for (var i = 0; i < arry.length; i++) {
            if (typeof arry[i] != 'undefined') {
                if (lang = "en_US") {
                    text += arry[i] + "  @fuck@  "
                } else {
                    text += arry[i] + "  ...@...  "
                }

            }
        }
        console.log("text", text)
        untils.getTranslate(text, function (data) {
            console.log('getTranslate');
            // console.log(data);
            let tranArr
            if (lang = "en_US") {
                tranArr = data.split("@ fuck @")
            } else {
                tranArr = data.split("@")
            }

            for (i = 0; i < tranArr.length; i++) {
                // console.log(tranArr[i])
            }
            for (var i = 0; i < arry.length; i++) {
                arrx[i] = arrx[i] + '=' + tranArr[i]
            }
            console.log("ready for write")
            writeFile(arrx)

        })

    })
}


main()