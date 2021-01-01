const { pool, express, jwt, key } = require('../../config/connect')
const router = express.Router()
// 获取标签数据
router.get('/totalTags', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`select tags.tagName,count(*) as num from tags,article where article.tags like CONCAT('%',tags.tagName,'%') GROUP BY tagName order by num DESC`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取标签数据失败', status: 404 }) }
            res.json({ data: r, msg: '获取标签数据成功', status: 200 })
        })
    })
})
module.exports = router