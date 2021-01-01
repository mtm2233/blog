const { pool, express, jwt, key } = require('../../config/connect')
const { reply, renderTime } = require('../../function/objToTree')
const router = express.Router()
const request = require('request')
const fs = require('fs')
// 获取回复列表
router.get('/query/:artId', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`SELECT reply.*,name,imgSrc,webSite,num,title,supp FROM reply,(SELECT user.*,a.num FROM user,(SELECT email,COUNT(*) as num FROM reply where reply.display='1' GROUP BY email) as a WHERE a.email=user.email) as b where reply.email=b.email AND reply.display='1' AND reply.artId=${req.params.artId} order by replyTime DESC,num DESC`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取评论列表失败', status: 404 }) }
            res.json({ data: reply(r), msg: '获取评论列表成功', status: 200 })
        })
        conn.release()
    })
})
// 获取最新的四条评论
router.get('/latest/:strip', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`SELECT reply.*,name,imgSrc,webSite,num,title,supp FROM reply,(SELECT user.*,a.num FROM user,(SELECT email,COUNT(*) as num FROM reply where reply.display='1' GROUP BY email) as a WHERE a.email=user.email) as b where reply.email=b.email AND reply.display='1' order by replyTime DESC,num DESC limit 0,${req.params.strip}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取最新的评论列表失败', status: 404 }) }
            res.json({ data: renderTime(r), msg: '获取最新的评论列表成功', status: 200 })
        })
        conn.release()
    })
})

// 发布评论接口
router.post('/add', (req, res) => {
    const email = jwt.sign(req.body.email, key)
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE article SET replys = replys + 1 WHERE artId = ${req.body.artId}`)
        conn.query(`INSERT INTO user (email, name, imgSrc, qq, webSite) VALUES ('${req.body.email}', '${req.body.name}', '${req.body.imgSrc}', '${req.body.qq}', '${req.body.webSite}')`, (e, r) => {
            if (e) {
                conn.query(`UPDATE user SET name = '${req.body.name}', imgSrc = '${req.body.imgSrc}', webSite = '${req.body.webSite}'  WHERE email = '${req.body.email}'`)
            }
        })
        conn.query(`INSERT INTO reply (email, content, artId, parentId) VALUES ('${req.body.email}', '${req.body.content}', '${req.body.artId}', '${req.body.parentId}')`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '发布失败', status: 404 }) }
            res.json({ data: {}, msg: '等待审核', status: 201, token: email })
        })
    })
})
module.exports = router