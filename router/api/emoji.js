const { express } = require('../../config/connect')
const router = express.Router()
const options = {
    root: './emoji',
    maxAge: 1000 * 60 * 60 * 24 * 30
}
router.get('/:url', function (req, res) {
    res.sendFile(req.params.url, options);
})
module.exports = router