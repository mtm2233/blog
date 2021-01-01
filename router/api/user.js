const { pool, express, jwt, key } = require('../../config/connect')
const router = express.Router()
const getqqName = require('../../function/getqqName.js')
// 获取评论最多的用户
router.get('/front/:number', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`SELECT name,imgSrc,webSite,reply.email,COUNT(reply.email)as strips FROM user,reply WHERE user.email=reply.email AND reply.display='1' GROUP BY reply.email order by strips desc limit 0,${req.params.number}`, (e, r) => {
            if (e) {
                return res.json({ data: e, msg: '获取评论最多的用户失败', status: 404 })
            }
            res.json({ data: r, msg: '获取评论最多的用户成功', status: 200 })
        })
        conn.release()
    })
})
// 根据token获取用户信息
router.post('/token', (req, res) => {
    let email
    try {
        email = jwt.verify(req.body.emailToken, key)
    } catch (e) {
        return res.json({ data: e, msg: 123 })
    }
    pool.getConnection((err, conn) => {
        conn.query(`select email,name,imgSrc,webSite from user where email = '${email}'`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取用户信息失败', status: 404 }) }
            res.json({ data: r, msg: '获取用户信息成功', status: 200 })
        })
    })
})
// 根据qq获取昵称和头像
router.get('/qq', (req, res) => {
    getqqName(req.query.qq, data => {
        res.json(data)
    })
})
module.exports = router