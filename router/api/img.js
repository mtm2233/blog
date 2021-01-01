const { express } = require('../../config/connect')
const router = express.Router()
const fs = require('fs')
//上传图片的模板
const multer = require('multer');
//生成的图片放入uploads文件夹下
const upload = multer({ dest: 'imgCache/' })
//图片上传必须用post方法
router.post('/add', upload.single('test'), (req, res) => {
    //读取文件路径
    fs.readFile(req.file.path, (err, data) => {
        //如果读取失败
        if (err) { return res.send('上传失败') }
        //如果读取成功
        //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
        let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);
        //拓展名
        let extname = req.file.mimetype.split('/')[1]
        //拼接成图片名
        let keepname = time + '.' + extname
        //三个参数
        //1.图片的绝对路径
        //2.写入的内容
        //3.回调函数
        fs.writeFile('uploads/' + keepname, data, (err) => {
            if (err) { return res.json({ data: {}, msg: '写入失败', status: 404 }) }
            res.json({ data: { imgSrc: keepname }, msg: '上传成功', status: 201 })
        })
    })
})
const options = {
    root:'./uploads',
    maxAge: 1000*60*60*24*30
}
const options1 = {
    root:'./jiangbei'
}
const options2 = {
    root:'./zhencunjchm'
}
router.get('/jiangbei/:url', function (req, res) {
    res.sendFile(req.params.url,options1);
})
router.get('/zhencunjchm/:url', function (req, res) {
    res.sendFile(req.params.url,options2);
})
router.get('/:url', function (req, res) {
    res.sendFile(req.params.url,options);
})
module.exports = router