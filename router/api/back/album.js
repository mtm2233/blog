const { pool, express } = require('../../../config/connect')
const router = express.Router()
// 获取符合条件的相册
router.post('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let total
        conn.query(`SELECT count(*) as total FROM album where title like '%${req.body.search}%'`, (e, r) => {
            total = r[0].total ? r[0].total : 0
        })
        conn.query(`SELECT * FROM album where title like '%${req.body.search}%' limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取相册列表失败', status: 404 }) }
            res.json({ data: r, msg: '获取相册列表成功', status: 200, total })
        })
    })
})
// 添加相册
router.post('/add', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`INSERT INTO album (title, content, imgSrc) VALUES ( '${req.body.title}', '${req.body.content}', '${req.body.imgSrc}')`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '相册创建失败', status: 404 }) }
            res.json({ data: {}, msg: '相册创建成功', status: 201 })
        })
    })
})
// 修改相册
router.post('/edit', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE album SET title = '${req.body.title}', content = '${req.body.content}', imgSrc = '${req.body.imgSrc}' WHERE albumId = ${req.body.albumId}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '相册修改失败', status: 404 }) }
            res.json({ data: {}, msg: '相册修改成功', status: 201 })
        })
    })
})
// 获取符合条件的图片
router.post('/pictures', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let total
        conn.query(`SELECT count(*) as total FROM pictures WHERE albumId like '%${req.body.albumId}%' and title like '%${req.body.search}%'`, (e, r) => {
            total = r[0].total ? r[0].total : 0
        })
        conn.query(`SELECT * FROM pictures WHERE albumId like '%${req.body.albumId}%' and title like '%${req.body.search}%' limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取图片列表失败', status: 404 }) }
            res.json({ data: r, msg: '获取图片列表成功', status: 200, total })
        })
    })
})
// 添加图片
router.post('/pictures/add', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`INSERT INTO pictures (albumId, imgSrc, title, content) VALUES ('${req.body.albumId}', '${req.body.imgSrc}', '${req.body.title}', '${req.body.content}')`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '添加图片失败', status: 404 }) }
            res.json({ data: {}, msg: '添加图片成功', status: 201 })
        })
    })
})
// 编辑图片
router.post('/pictures/edit', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE pictures SET albumId = ${req.body.albumId}, imgSrc = '${req.body.imgSrc}', title = '${req.body.title}', content = '${req.body.content}' WHERE imgId = ${req.body.imgId}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '编辑图片失败', status: 404 }) }
            res.json({ data: {}, msg: '编辑图片成功', status: 201 })
        })
    })
})
module.exports = router