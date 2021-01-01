const { pool, express } = require('../../../config/connect')
const router = express.Router()

// 根据条件获取评论
router.post('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let total
        conn.query(`select count(*) as total from reply where content like '%${req.body.search}%' and display like '%${req.body.display}%'`, (e, r) => {
            total = r[0].total ? r[0].total : 0
        })
        conn.query(`select replyId,content,replyTime,display from reply where content like '%${req.body.search}%' and display like '%${req.body.display}%' limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取评论列表失败', status: 404 }) }
            res.json({ data: r, msg: '获取评论列表成功', status: 200, total })
        })
    })
})

// 评论是否显示
router.post('/display/:replyId', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE reply SET display = ABS(display-1) WHERE replyId=${req.params.replyId}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '评论是否显示修改失败', status: 404 }) }
            res.json({ data: {}, msg: '评论是否显示修改成功', status: 201 })
        })
    })
})
module.exports = router