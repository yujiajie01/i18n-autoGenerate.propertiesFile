const http = require("http")
var request = require('request');


//http://api.k780.com/?app=code.hanzi_fanjian&typeid=1&wd=需要转换的汉字&appkey=APPKEY&sign=SIGN&format=json 简繁
//http://fanyi.youdao.com/translate?&doctype=json&type=ZH_CN2JA&i=%E6%93%8D%E4%BD%A0%E5%A6%88 中英
function getTranslatex(word, cb) {
    word = '你好啊'
    // var url = "http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=" + word;
    var url = "http://fanyi.youdao.com/translate?&doctype=json&type=ZH_CN2JA&i=" + word;
    //  data = JSON.stringify(word);  
    //data = require('querystring').stringify(data);  

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the baidu homepage.
            cb(body)
        }
        console.log("err", error)
        console.log("response", response)
        console.log("body", body)
    })

}

function getTranslate(word, cb) {
    
    // let typeT='fr'
    // let typeT='en'
    // let typeT='ko'
    let typeT='HK'



    const qs = require('querystring');
    let options = {
        url: 'http://fy.iciba.com/ajax.php?a=fy&' + qs.stringify({f:'cn',t:typeT,w: word})
    };
   
    // var url = 'https://cn.bing.com/translate?from=zh-CHS&to=en&text=' + word
    // url = encodeURI(url)

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.info(response.body)
            console.info(typeof response.body)
            var jsonstr =JSON.parse(response.body);
            // console.log('jsonstr',jsonstr)
            // console.log('jsonstr',jsonstr.content)
            console.log("word",word)
            console.log('jsonstr',jsonstr.content.out)
            console.log('response============================')  
            cb(jsonstr.content.out)
        }else{
            console.log("err", error)
        }
        // console.log("err", error)
        // console.log("response", response)
        // console.log("body", body)
    })

}

module.exports = {
    getTranslate: getTranslate
}