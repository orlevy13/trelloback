const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { saveBoard, getBoards, deleteBoard, getBoardById } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards);
router.get('/:id', getBoardById)
router.post('/', saveBoard);
router.put('/', saveBoard)
router.delete('/:id', requireAuth, deleteBoard);

module.exports = router