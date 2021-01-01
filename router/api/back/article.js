const { pool, express } = require('../../../config/connect')
const router = express.Router()


// 获取博客文章
router.post('/query', (req, res) => {
    pool.getConnection((err, conn) => {
        let num = (req.body.pagenum - 1) * req.body.pagesize
        let totalpage
        conn.query(`SELECT count(*) as totalpage FROM article WHERE title like '%${req.body.search}%' and typeId like '%${req.body.typeId}%' and tags like '%${req.body.tags}%' order by addTime DESC,artId DESC`, (e, r) => {
            totalpage = r[0].totalpage ? r[0].totalpage : 0
        })
        conn.query(`SELECT artId,title,imgSrc,addTime,clicks,replys,isReply FROM article WHERE article.title like '%${req.body.search}%' and typeId like '%${req.body.typeId}%' and tags like '%${req.body.tags}%' order by addTime DESC,artId DESC limit ${num},${req.body.pagesize}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取博客文章失败', status: 404 }) }
            res.json({ data: r, msg: '获取博客文章成功', status: 200, totalpage })
        })
        conn.release()
    })
})
// 根据artId获取文章详情
router.get('/query/:artId', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`select artId,typeId,title,content,imgSrc,tags,carousel,carImg,isReply from article where artId=${req.params.artId}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '文章详情获取失败', status: 404 }) }
            res.json({ data: r, msg: '文章详情获取成功', status: 200 })
        })
    })
})
// 发布文章
router.post('/add', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`INSERT INTO article ( typeId, title, imgSrc, tags, isReply, carousel, carImg, content) VALUES ('${req.body.typeId}', '${req.body.title}', '${req.body.imgSrc}', '${req.body.tags}', '${req.body.isReply}', '${req.body.carousel}', '${req.body.carImg}', '${req.body.content}')`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '文章发布失败', status: 404 }) }
            res.json({ data: {}, msg: '文章发布成功', status: 201 })
        })
    })
})
// 文章评论允许与禁止
router.post('/reply/:artId', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE article SET isReply = ABS(isReply-1) WHERE artId=${req.params.artId}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '文章是否可以评论修改失败', status: 404 }) }
            res.json({ data: {}, msg: '文章是否可以评论修改成功', status: 201 })
        })
    })
})
// 修改文章
router.post('/edit', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`UPDATE article SET typeId = '${req.body.typeId}', title = '${req.body.title}', imgSrc = '${req.body.imgSrc}', tags = '${req.body.tags}',isReply='${req.body.isReply}', carousel = '${req.body.carousel}', carImg = '${req.body.carImg}', content = '${req.body.content}' WHERE artId = ${req.body.artId}`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '文章修改失败', status: 404 }) }
            res.json({ data: {}, msg: '文章修改成功', status: 201 })
        })
    })
})

// 获取文章分类
router.get('/type', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`select * from type where parentId !=0`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '获取文章分类失败', status: 404 }) }
            res.json({ data: r, msg: '获取文章分类成功', status: 200 })
        })
    })
})

// 添加文章分类
router.post('/addtype', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query(`INSERT INTO type (type, parentId) VALUES ('${req.body.type}', '${req.body.parentId}')`, (e, r) => {
            if (e) { return res.json({ data: e, msg: '文章分类添加失败', status: 404 }) }
            res.json({ data: {}, msg: '文章分类添加成功', status: 201 })
        })
    })
})

module.exports = router