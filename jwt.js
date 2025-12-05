const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    //first check request headers has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({ message: 'token not founf' });

    //extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        //verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attach user info to the request object
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).json({ message: 'Inavalid token' });
    }
};

//fucntion to generate a jwt token
const generateToken = (userData) => {
    //generate a jwt token with user data 
    return jwt.sign({userData}, process.env.JWT_SECRET,{expiresIn: '3000'});
}

module.exports = {jwtAuthMiddleware, generateToken};