const { pool, express } = require('../../../config/connect')
const router = express.Router()
// 查询所有友链分类
router.get('/type', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('SELECT * FROM urltype', (e, r) => {
            res.json({ data: r, msg: '获取友链分类成功', status: 200 })
        })
    })
})
// 查询符合条件的友链
router.post('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let total
        conn.query(`SELECT count(*) as total FROM friend where urlTypeId like '%${req.body.urlTypeId}%' and name like '%${req.body.name}%'`, (e, r) => {
            total = r[0].total ? r[0].total : 0
        })
        conn.query(`SELECT * FROM friend where urlTypeId like '%${req.body.urlTypeId}%' and name like '%${req.body.name}%' limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取友链分类失败', status: 404 }) }
            res.json({ data: r, msg: '获取友链分类成功', status: 200, total })
        })
    })
})
// 添加友链
router.post('/add', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`INSERT INTO friend ( urlTypeId, url, icon, name, descript) VALUES (${req.body.urlTypeId}, '${req.body.url}', '${req.body.icon}', '${req.body.name}', '${req.body.descript}')`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '添加友链失败', status: 404 }) }
            res.json({ data: {}, msg: '添加友链成功', status: 201 })
        })
    })
})
// 友链显示与隐藏
router.post('/display/:friendId', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE friend SET display = ABS(display-1) WHERE friendId=${req.params.friendId}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '友链显示与隐藏修改失败', status: 404 }) }
            res.json({ data: {}, msg: '友链显示与隐藏修改成功', status: 201 })
        })
    })
})
module.exports = router