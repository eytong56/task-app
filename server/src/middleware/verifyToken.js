import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

function verifyToken(req, res, next) {
  // const bearerHeader = req.headers["authorization"];
  // if (!bearerHeader) {
  //   return res.status(403).json({ error: "No token provided" });
  // }
  // const token = bearerHeader.split(" ")[1];
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, authData) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = authData;
    next();
  });
}

export default verifyToken;
