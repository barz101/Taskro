const jwt = require("jsonwebtoken");

const checkToken = (req:any, res:any, next:any) => {
  // res.clearCookie("jwt", "jsontoken","json00token","json010token");
  // res.send('user logout successfully');
  let {token} = req.cookies;
  if (token) {
    jwt.verify(token, 'qwe1234', (err:any, decoded:any) => {
      if (err) {
        return res.json({
          success: 0,
          message: "Invalid Token..."
        });
      } else {
        // console.log('  req.decoded',  req.decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
}
export default checkToken