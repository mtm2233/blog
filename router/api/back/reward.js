const { pool, express } = require('../../../config/connect')
const router = express.Router()
// 编辑
router.post('/edit', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE reward SET name = '${req.body.name}', money = '${req.body.money}', message = '${req.body.message}' WHERE reId = ${req.body.reId}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '修改失败', status: 404 }) }
            res.json({ data: {}, msg: '修改成功', status: 201 })
        })
    })
})
// 添加
router.post('/add', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`INSERT INTO reward (name, reTime, money, message, source) VALUES ('${req.body.name}', '${req.body.reTime}', '${req.body.money}', '${req.body.message}', '${req.body.source}');`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '添加失败', status: 404 }) }
            res.json({ data: {}, msg: '添加成功', status: 201 })
        })
    })
})

module.exports = router