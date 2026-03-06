const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  const {token }= req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not authorized login again!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = isAdmin;
