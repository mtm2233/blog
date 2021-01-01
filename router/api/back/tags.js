const { pool, express } = require('../../../config/connect')
const router = express.Router()

// 获取标签列表
router.post('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let total
        conn.query(`SELECT count(*) as total FROM tags where tagName like '%${req.body.search}%'`, (e, r) => {
            total = r[0].total ? r[0].total : 0
        })
        conn.query(`SELECT * FROM tags where tagName like '%${req.body.search}%' limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取标签失败', status: 404 }) }
            res.json({ data: r, msg: '获取标签成功', status: 200, total })
        })
    })
})
// 添加标签
router.post('/add', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`INSERT INTO tags (tagName) VALUES ('${req.body.tagName}')`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '标签添加失败', status: 404 }) }
            res.json({ data: {}, msg: '标签添加成功', status: 201 })
        })
    })
})
// 编辑标签
router.post('/edit', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE tags SET tagName = '${req.body.tagName}' WHERE tagId = ${req.body.tagId}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '标签编辑失败', status: 404 }) }
            res.json({ data: {}, msg: '标签编辑成功', status: 201 })
        })
    })
})
module.exports = router