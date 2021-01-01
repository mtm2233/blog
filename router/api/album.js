const { pool, express } = require('../../config/connect')
const router = express.Router()
// 获取相册列表
router.post('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let totalpage
        conn.query(`SELECT count(*) as totalpage FROM album WHERE title like '%${req.body.search}%'`, (e, r) => {
            totalpage = r[0].totalpage ? r[0].totalpage : 0
        })
        conn.query(`SELECT album.*,a.num FROM album,(SELECT count(imgId) as num,albumId FROM pictures GROUP BY albumId) as a WHERE album.AlbumId=a.albumId and title like '%${req.body.search}%'`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取相册列表失败', status: 404 }) }
            for (ind in r) {
                r[ind].addTime = r[ind].addTime.toISOString().slice(0, 10)
            }
            res.json({ data: r, msg: '获取相册列表成功', status: 200, totalpage })
        })
        conn.release()
    })
})
router.post('/querypage', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let totalpage
        conn.query(`SELECT count(*) as totalpage FROM album WHERE title like '%${req.body.search}%'`, (e, r) => {
            totalpage = r[0].totalpage ? r[0].totalpage : 0
        })
        conn.query(`SELECT album.*,a.num FROM album,(SELECT count(imgId) as num,albumId FROM pictures GROUP BY albumId) as a WHERE album.AlbumId=a.albumId and title like '%${req.body.search}%' limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取相册列表失败', status: 404 }) }
            for (ind in r) {
                r[ind].addTime = r[ind].addTime.toISOString().slice(0, 10)
            }
            res.json({ data: r, msg: '获取相册列表成功', status: 200, totalpage })
        })
        conn.release()
    })
})
router.get('/pictures/:albumId', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE album SET clicks = clicks + 1 WHERE albumId = ${req.params.albumId}`)
        conn.query(`SELECT * FROM pictures WHERE albumId = '${req.params.albumId}' and title like '%${req.query.search}%'`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取图片列表失败', status: 404 }) }
            res.json({ data: r, msg: '获取图片列表成功', status: 200 })
        })
    })
})

module.exports = router