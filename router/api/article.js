const { pool, express } = require('../../config/connect')
const router = express.Router()
const archiver = require('../../function/archiver')
// 获取博客文章
router.post('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let totalpage
        conn.query(`SELECT count(*) as totalpage FROM article WHERE title like '%${req.body.search}%' and typeId like '%${req.body.typeId}%' and tags like '%${req.body.tags}%' and isDisplay='1' order by addTime DESC,artId DESC`, (e, r) => {
            totalpage = r[0].totalpage ? r[0].totalpage : 0
        })
        conn.query(`SELECT artId,title,imgSrc,addTime,clicks,replys FROM article WHERE article.title like '%${req.body.search}%' and typeId like '%${req.body.typeId}%' and tags like '%${req.body.tags}%' and isDisplay='1' order by addTime DESC,artId DESC limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取博客文章失败', status: 404 }) }
            for (ind in r) {
                r[ind].addTime = r[ind].addTime.toISOString().slice(0, 10)
            }
            res.json({ data: r, msg: '获取博客文章成功', status: 200, totalpage })
        })
        conn.release()
    })
})
// 归档
router.get('/archiver', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`SELECT artId,title,addTime FROM article where isDisplay='1' order by addTime DESC,artId DESC`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取归档失败', status: 404 }) }
            res.json({ data: archiver(r), msg: '获取归档成功', status: 200 })
        })
        conn.release()
    })
})
// 博客数据统计
router.get('/total', (req, res) => {
    pool.getConnection((err, conn) => {
        let typeNum, clickNum, replyNum, artNum, tagsNum
        conn.query(`SELECT SUM(clicks) as clicksNum FROM album`, (e, r) => {
            clickNum = r[0].clicksNum ? r[0].clicksNum : 0
        })
        conn.query(`SELECT count(*)as typeNum FROM type where parentId !=0`, (e, r) => {
            typeNum = r[0].typeNum ? r[0].typeNum : 0
        })
        conn.query(`SELECT SUM(clicks) as clicksNum,sum(replys) as replysNum FROM article`, (e, r) => {
            clickNum += r[0].clicksNum ? r[0].clicksNum : 0
            replyNum = r[0].replysNum ? r[0].replysNum : 0
        })
        conn.query(`SELECT COUNT(*) as artNum FROM article WHERE isDisplay='1'`, (e, r) => {
            artNum = r[0].artNum ? r[0].artNum : 0
        })
        conn.query(`SELECT COUNT(*) as tagsNum FROM tags`, (e, r) => {
            tagsNum = r[0].tagsNum ? r[0].tagsNum : 0
            res.json({
                data: [
                    { name: '分类', num: typeNum },
                    { name: '浏览', num: clickNum },
                    { name: '评论', num: replyNum },
                    { name: '文章', num: artNum },
                    { name: '标签', num: tagsNum }
                ], msg: '获取博客数据统计成功', status: 200
            })
        })
        conn.release()
    })
})
// 轮播图
router.get('/carousel', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`SELECT artId,title,carImg FROM article WHERE carousel='1'`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取需要轮播的博客文章失败', status: 404 }) }
            res.json({ data: r, msg: '获取需要轮播的博客文章成功', status: 200 })
        })
        conn.release()
    })
})
// 根据文章id获取详细信息
router.get('/artById/:artId', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`select article.*,name FROM article,user WHERE article.email=user.email and artId='${req.params.artId}'`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取博客文章失败', status: 404 }) }
            for (ind in r) {
                r[ind].addTime = r[ind].addTime.toISOString().slice(0, 10)
            }
            res.json({ data: r, msg: '获取博客文章成功', status: 200 })
        })
        conn.release()
    })
})
// 根据文章id获取是否开启了回复功能
router.get('/isReply/:artId', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE article SET clicks = clicks + 1 WHERE artId = ${req.params.artId}`)
        conn.query(`select isReply FROM article WHERE artId='${req.params.artId}'`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取回复功能失败', status: 404 }) }
            res.json({ data: {}, msg: '获取回复功能成功', status: 200, isReply: r[0].isReply })
        })
        conn.release()
    })
})
module.exports = router