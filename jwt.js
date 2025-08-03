const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    //Token -> request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        //Verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        //Attach user info to req object
        req.userPayload = decoded;
        next();

    }catch(err) {
        console.log(err);
        res.status(401).json({ error: 'Unauthorized' });
    }
}

//Function to generate JWT

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken};