const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/login", async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Email o password incorrectos");
    const hash = await bcrypt.compare(req.body.password, user.password);
    if (!hash) return res.status(400).send("Email o password incorrectos");
    const jwtToken = user.generateJWT();
    return res.status(200).send({jwtToken});
})

module.exports = router;
