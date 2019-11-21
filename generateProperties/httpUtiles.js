const http = require("http")
var request = require('request');


function getTranslate(word, cb) {

    // let typeT='fr'
    // let typeT = 'en'
    let typeT='ko'


    const qs = require('querystring');
    let options = {
        url: 'http://fy.iciba.com/ajax.php?a=fy&' + qs.stringify({
            f: 'cn',
            t: typeT,
            w: word
        })
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonstr = JSON.parse(response.body);
            console.log('jsonstr', jsonstr.content.out)
            cb(jsonstr.content.out)
        } else {
            console.log("err", error)
        }

    })

}

module.exports = {
    getTranslate: getTranslate
}