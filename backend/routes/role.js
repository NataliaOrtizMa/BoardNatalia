const express = require("express");
const router = express.Router();
const Role = require("../models/role");

router.post("/create", async(req, res) => {
    if (!req.body.name || !req.body.description) 
        return res.status(401).send("Rejected request: Incomplete data");
    role = await Role.findOne({name: req.body.name})
    if (role) return res.status(401).send("Rejected request: This role already exists");
    role = new Role ( {
        name: req.body.name,
        description: req.body.description,
        status: true
    })
    const result = await role.save();
    if (!result) return res.status(401).send("Error in request");
    return res.status(200).send({result});
});

router.get("/getAll", async(req,res) => {
    const role = await Role.find();
    if (!role) return res.status(401).send("Error in request");
    return res.status(200).send({role})
});

module.exports = router;

