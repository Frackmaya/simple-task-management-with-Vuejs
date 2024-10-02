const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
  const authHeader=req.headers.authorization;
  
  if(!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).send('Unauthorized');
  }
  
  const token=authHeader.split(' ')[1];
  try{
      const decoded=jwt.verify(token,'mysecretkeys');
      req.userId = decoded.userId;
    
      next();
  }catch(error){
      res.status(403).json('Forbidden')
  }
  };
  
module.exports = authenticate;