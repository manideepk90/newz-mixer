import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.ACCESS_KEY_TOKEN;

export default function WithAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error("Token validation error:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}
