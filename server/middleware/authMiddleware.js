import { verify } from "jsonwebtoken";
const jwtKEY =
  "DEJH+kQlxivOpfGxCmB5D47HJJiFqt1zisGGL9y16S2hNFFlZxYhNeN2s2HSz4ki";

function authMiddleware(req, res, next) {
  const token = req.header("Auth");

  if (!token) {
    return res.status(401).json({ error: "Não autorizado: Token em falta" });
  }

  try {
    const decoded = verify(token, jwtKEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Não autorizado: Token inválido" });
  }
}
