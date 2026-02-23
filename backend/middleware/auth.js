const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log(req.header("Authorization"), "gelen token");
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    //Tokenın olup olmadığı kontrol edilir
    return res.status(401).json({ message: "no token provided" });
  }

  try {
    //Tokenın geçerli olup olmadığı kontrol edilir
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "invalid token" });
  }
};

module.exports = authMiddleware;

/*jwt.verify() şunu yapar:
Token içindeki header ve payload'ı alır.Bunları birleştirir ve kendi içinde JWT_SECRET ile yeniden signature oluşturur.
Bu yeniden oluşturduğu signature ile token’ın içindeki signature’ı karşılaştırır.Eğer uyuşuyorsa: Token geçerli.Uyuşmuyorsa veya süresi dolmuşsa: Token geçersiz (hata fırlatır).*/
