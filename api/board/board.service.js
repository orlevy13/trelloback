
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    try {

        const collection = await dbService.getCollection('board');
        const boards = collection.find().toArray();
        return boards;
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}
async function save(board) {
    const collection = await dbService.getCollection('board');
    try {
        if (!board._id) {
            await collection.insertOne(board);
        }
        else {
            board._id = ObjectId(board._id);
            result = await collection.replaceOne({ "_id": board._id }, { $set: board });
            console.log(result);
        }

    } catch (err) {
        console.log(`ERROR: cannot save board`)
        throw err;
    }
    return board;

}

async function getById(boardid) {
    const collection = await dbService.getCollection('board');
    try {
        const board = await collection.findOne({ "_id": ObjectId(boardid) });
        return board;

    } catch (err) {
        console.log(`ERROR: cannot getById board ${boardid}`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    save,
    getById
}


