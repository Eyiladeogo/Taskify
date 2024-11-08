import jwt from "jsonwebtoken";

// Authentication Middleware
const authenticateUser = (req, res, next) => {
    // Check if token is present in headers
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
  
    try {
      // Verify JWT token
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const tokenString = token.split(' ')[1]
      console.log(`token is ${tokenString}`)
      const decoded = jwt.verify(tokenString, "$2b$10$SLL2HpUBxYQDTf.qI6jLF.DkB/WCMbzmG5uihwc3zK6EqRYcHrTiq")
      console.log(
        `\n\n\n\n
        TOKEN PART:\n
        DECODED TOKEN - ${decoded}
        Username = ${decoded.userId}`
      )
  
      // Attach user ID to request object
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
  
export default authenticateUser
  