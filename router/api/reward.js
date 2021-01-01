const { pool, express } = require('../../config/connect')
const router = express.Router()

router.post('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let total, totalm
        let search = req.body.search ? req.body.search : ''
        conn.query(`SELECT sum(money) as totalm,count(*) as total FROM reward where name like '%${search}%'`, (e, r) => {
            total = r[0].total ? r[0].total : 0
            totalm = r[0].totalm ? r[0].totalm : 0
        })
        conn.query(`SELECT * FROM reward where name like '%${search}%' ORDER BY money DESC limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取赞助列表数据失败', status: 404 }) }
            res.json({ data: r, msg: '获取赞助列表数据成功', status: 200, total, totalm })
        })
        conn.release()
    })
})
module.exports = router