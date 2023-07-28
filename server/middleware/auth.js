const jwt = require('jsonwebtoken');
const crypto = require("crypto")




exports.generateToken = (id) => {
    const secret = crypto.randomBytes(64).toString('hex');
    const token = jwt.sign({ id},"secret", { expiresIn: '1d' });
    return token;
  };

  exports.verifyRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Accès interdit' });
      }
      next();
    };
  };


exports.authenticate = (req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '');
    // if (!token) return res.status(401).send({message: 'Access Denied'});
   
    const token = req.cookies["token"]
    try {
      const verified = jwt.verify(token, 'secret');
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send({message: 'Invalid Token'});
    }
  };

