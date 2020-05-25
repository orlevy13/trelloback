const logger = require('../../services/logger.service')
const boardService = require('./board.service')

// TODO: needs error handling! try, catch

async function getBoards(req, res) {
    try {
        const boards = await boardService.query(req.query)
        res.send(boards)
    } catch (err) {
        logger.error(err);
        logger.error('Cannot get boards: ' + err.message);
        res.status(500).send({ error: 'cannot get boards' })
    }
}

async function getBoardById(req, res) {
    try {
        const { id } = req.params;
        const board = await boardService.getById(id)
        res.send(board)
    } catch (err) {

        logger.error('Cannot get boards', err.message);
        res.status(500).send({ error: `cannot get board with id: ${id}` });
    }
}



async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete board', err.message);
        res.status(500).send({ error: 'cannot delete board' })
    }
}

async function saveBoard(req, res) {
    var board = req.body;
    board = await boardService.save(board);
    res.send(board);
}


module.exports = {
    getBoards,
    deleteBoard,
    saveBoard,
    getBoardById
}