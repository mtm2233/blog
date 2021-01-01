const request = require('request')
const iconv = require('iconv-lite');
const fs = require('fs')
const { jwt, key } = require('../config/connect')
function getqqName(uid, callback) {
    request(`http://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=${uid}`, { encoding: null }, (error, res, data) => {
        const qqInfo = iconv.decode(Buffer.from(data, 'binary'), 'gbk').toString()
        const arr = qqInfo.slice(qqInfo.search(/\[/i) + 1, -3).split(',')
        const imgSrc = `https://q.qlogo.cn/headimg_dl?dst_uin=${uid}&spec=100`
        const keepname = jwt.sign(uid, key).slice(21,-1) + '.jpg'
        const writeStream = fs.createWriteStream('./uploads/' + keepname)
        request(imgSrc).pipe(writeStream)
        writeStream.on('close', function () {
            callback({ imgSrc: 'https://api.youcann.club/img/'+keepname, name: arr[6].slice(1, -1) })
        })
    })
}
module.exports = getqqName