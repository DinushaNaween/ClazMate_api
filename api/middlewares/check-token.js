const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.Split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decode;
        next();
    } catch {
        return res.status(401).json({
            state: false
        })
    }
}