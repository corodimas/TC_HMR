const { verify } = require('jsonwebtoken');

const validataeToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "กรุณาลงชื่อเข้าใช้" });
  }

  try {
    const validToken = verify(accessToken, "2spKlbzOG1");
    if (validToken) {
      // Set the username from the token in req.user
      req.user = { username: validToken.username };
      return next();
    }
  } catch (err) {
    return res.json({ error: err.message });
  }
};

module.exports = { validataeToken };
