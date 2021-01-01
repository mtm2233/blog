const { pool, express } = require('../../config/connect')
const router = express.Router()
// 获取友链列表
router.get('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let urlList = {}
        conn.query(`SELECT * FROM urltype`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取友链列表失败', status: 404 }) }
            for (let item of r) {
                urlList[item.urlTypeId] = item
                urlList[item.urlTypeId].children = []
            }
            conn.query(`SELECT * FROM friend where display = 1`, (e, r) => {
                if (e) { return res.json({ data: e, msg: '获取友链列表失败', status: 404 }) }
                for (let item of r) {
                    urlList[item.urlTypeId].children.push(item)
                }
                res.json({ data: urlList, msg: '获取友链列表成功', status: 200 })

            })

        })
        conn.release()
    })
})
module.exports = router