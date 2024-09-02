//  Middleware for authentication and other functions
// Middleware for JWT authentication
// const jwt=require('jsonwebtoken')

// const authenticateToken =(req,res,next) =>{
//     const authHeader= req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if(token == null) return res.sendStatus(401)
//         jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
//            if(err) return res.sendStatus(403)
//            req.user = user
//            next();
//         })
// }

// src/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to check if the request is authenticated
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
