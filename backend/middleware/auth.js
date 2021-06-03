const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    let jwtToken = req.header("Authorization");
    if (!jwtToken) return res.status(400).send("Autorization denied: No token");
    jwtToken = jwtToken.split(" ")[1];
    if (!jwtToken) return res.status(401).send("Autorization denied: No token");
    try {
        const payload = await jwt.verify(jwtToken, process.env.JWT_KEY);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).send("Autorization denied: Invalid Token");
    }
};

module.exports = auth;