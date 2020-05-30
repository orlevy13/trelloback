const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  // if (!req.session || !req.session.user) {  ///not working for every body talk to yaron!!!!
  //   res.status(401).end('Unauthorized!');
  //   return;
  // }
  next();
}

async function requireAdmin(req, res, next) {
  const user = req.session.user;
  if (!user.isAdmin) {
    res.status(403).end('Unauthorized Enough..');
    return;
  }
  next();
}


// module.exports = requireAuth;

module.exports = {
  requireAuth,
  requireAdmin
}
