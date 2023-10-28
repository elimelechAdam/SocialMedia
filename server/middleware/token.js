const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).send("Token not found.");
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const checkUserOwnership = (req, res, next) => {
  const userId = req.params.userId;
  if (req.user._id !== userId) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only update your own profile." });
  }
  next();
};

module.exports = { authenticateJWT, checkUserOwnership };
