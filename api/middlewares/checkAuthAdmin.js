const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).json({
      message: "Access Denied! No token entered.",
    });

  const token = req.headers.authorization.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    if (req.user.type == "instructor") {
      next();
    } else {
      return res.status(403).json({
        message: "Invalid token",
      });
    }
  } catch (err) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};
