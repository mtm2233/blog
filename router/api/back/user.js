const { pool, express } = require('../../../config/connect')
const router = express.Router()
router.post('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let total
        conn.query(`select count(*) as total from user where name like '%${req.body.search}%'`, (e, r) => {
            total = r[0].total ? r[0].total : 0
        })
        conn.query(`select email,name,imgsrc,title,supp,addTime from user where name like '%${req.body.search}%' limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取用户列表失败', status: 404 }) }
            res.json({ data: r, msg: '获取用户列表成功', status: 200, total })
        })
    })
})
router.post('/title', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE user SET title = '${req.body.title}', supp = '${req.body.supp}' WHERE email = '${req.body.email}'`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '修改用户称号失败', status: 404 }) }
            res.json({ data: {}, msg: '修改用户称号成功', status: 201 })
        })
    })
})
module.exports = router