const admin = require("../models/adminModel");
const jwt = require ("jsonwebtoken");

const loginAuth = async (req, res, next) => {
  try {
    const { userId } = req.params
    const adminUser = await admin.findById(userId);
    if (!adminUser) {
       res.status(400).json({
        message: "you are not authorised"
       })
   
    } else if (adminUser.isLogin !== true) {
      res.status(403).json({
        message: "you are not loggedin, logg in to perform action"
      })

    } else {
      next();
    }
    
  } catch (error) {
    res.status(500).json({
        message: error.message
    })
    
  }
}

const userAuth = (req, res, next)=>{
  const hasAuthorization = req.headers.authorization;
  if(!hasAuthorization) {
      res.status(403).json({
          message: 'No Authorization Found'
      });
  } else {
      const token = hasAuthorization.split(' ')[1];
      try {
          // console.log(req.headers)
          const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
          req.user = JSON.stringify(decodedToken);
          req.userId = decodedToken.userId;
          req.userEmail = decodedToken.email;
          req.firstName = decodedToken.firstName;
          next()
      } catch (error) {
          res.status(500).json({
              message: error.message,
              message2:"token expired, pls login to perform action"
          })
      }
  }
};





const authenticator = async (req, res,next)=>{
  const { id } = req.params;
  
  const newUser = await admin.findById(id);
  const token = newUser.token;
  await jwt.verify(token, process.env.JWT_TOKEN, (err, payLoad)=>{
      if(err){
          return res.status(403).json({
              message: 'token is not valid'
          })
      } else {
          req.newUser = payLoad;
          next();
      }
  })
}
module.exports = { loginAuth, authenticator, userAuth  }