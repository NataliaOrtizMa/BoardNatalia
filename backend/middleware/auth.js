const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let jwtToken = req.header("Authorization");
    if (!jwtToken) return res.status(400).send("Autorización rechazada: No hay un token");
    jwtToken = jwtToken.split(" ")[1];
    if (!jwtToken) return res.status(401).send("Autorización rechazada: No hay un token");
    try {
        const payload = jwt.verify(jwtToken, "secretJWT");
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).send("Autorización rechazada: Token inválido")
    }
};

module.exports = auth;