const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password);
        req.session.user = user;
        console.log(req.session.user);
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {

    try {
        const { email, password, fullName } = req.body
        logger.debug(email + ", " + fullName + ', ' + password)
        const user = await authService.signup(email, password, fullName)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(user))
        res.json(user);
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send(err);
    }
}

async function logout(req, res) {

    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout
}