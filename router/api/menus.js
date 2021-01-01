const { pool, express } = require('../../config/connect')
const { menus } = require('../../function/objToTree')
const router = express.Router()
// 获取右侧导航菜单
router.get('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`select * from type`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '查询右侧菜单列表失败', status: 404 }) }
            res.json({ data: menus(r), msg: '查询右侧菜单列表成功', status: 200 })
        })
        conn.release()
    })
})
// 获取nav菜单
router.get('/nav', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`select * from nav`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '查询nav列表失败', status: 404 }) }
            res.json({ data: r, msg: '查询nav列表成功', status: 200 })
        })
        conn.release()
    })
})
module.exports = router