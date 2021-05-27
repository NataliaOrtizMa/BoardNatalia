const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

router.post("/createTask", Auth, async(req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send("Usuario no autenticado");
    const board = new Board ({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        status: "to-do",
    });
    const result = await board.save();
    return res.status(200).send({result});
});

router.get("/getTasks", Auth, async(req,res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).send("La persona no existe en DB");
    const board = await Board.find({userId: req.user._id});
    return res.status(200).send({board});
})

module.exports = router;
