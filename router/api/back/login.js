const { pool, express, jwt, backey } = require('../../../config/connect')
const router = express.Router()
router.post('/', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`select * from admin where username='${req.body.username}' and password='${req.body.password}'`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '登陆失败', status: 404 }) }
            if (r&&r.length===1) {
                res.json({ data: r, msg: '登陆成功', status: 200, logintoken: jwt.sign(req.body.username, backey) })
            } else {
                res.json({ data: {}, msg: '登陆失败', status: 404 })
            }
        })
    })
})
module.exports = router