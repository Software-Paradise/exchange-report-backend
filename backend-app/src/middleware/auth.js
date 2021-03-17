const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(403)
      .json({ message: `Access denied, no token provided`, success: false });

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
  
    (error, decode) => {
      if (!error) {
        next();
      } else {
        res.status(400).json({ message: `Invalid Token!`, success: false });
      }
    }
  );
};