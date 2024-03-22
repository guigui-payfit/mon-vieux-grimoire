const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization value is shaped like "Bearer xxx"
    const decodedToken = jwt.verify(token, process.env["JWT_ENCRYPTION_KEY"]);
    const userId = decodedToken.userId;
    req.auth = { userId };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
