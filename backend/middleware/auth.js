import jwt from "jsonwebtoken";

const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers;
    if (!token) {
      return res.json({success:false,message:"Not authorised login again"})
    }
    try {
      const token_decode = jwt.verify(token,process.env.JWT_SECRET)
      //console.log("Decoded token:", token_decode);
      req.body.userId = token_decode.id;
      next();
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
    }
}
export default authMiddleware;

// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1] || req.headers.token;

//   if (!token) {
//     return res.status(401).json({ success: false, message: "No token provided. Please login again." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decoded);
//     req.userId = decoded.id; // Store userId in req.userId instead of req.body.userId
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ success: false, message: "Token expired. Please login again." });
//     }
//     res.status(401).json({ success: false, message: "Invalid token. Please login again." });
//   }
// };

// export default authMiddleware;

