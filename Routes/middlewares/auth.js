const jwt = require("jsonwebtoken");

const authenticating = (req, res, next) => {
  // verify token
  //     thanhcong: return next()
  //     thatbai: res.json(err)
  const token = req.header("Authorization");
  const fingerprint = req.header("fingerprint");
  try {
    const decoded = jwt.verify(token, fingerprint);
    // console.log('giai ma: ',decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json("khong the login");
  }
};

const authorizing = userTypeArray => {
  return (req, res, next) => {
    const { userType } = req.user;

    if (userTypeArray.includes(userType)) {
      next();
    } else {
      res.status(403).json("ban login ok nhung k co quyen xem cai nay");
    }
  };
};

module.exports = { authenticating, authorizing };
