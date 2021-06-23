const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const Role = require("../models/role")
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const AdminAuth = require("../middleware/admin");

router.post("/newUser", async(req,res) => {   
    if(!req.body.name || !req.body.email || !req.body.password)
        return res.status(401).send("Rejected request: Incomplete data");

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(401).send("Reject request: This user already exists");

    const role = await Role.findOne({name: "user"});
    if (!role) return res.status(401).send("Rejected request: No role was specified ");

    const hash = await bcrypt.hash(req.body.password, 10);
    user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hash ,
        roleId: role._id,
        status: true
    })
    
    try {
        const result = await user.save();
        if (!result) return res.status(401).send("Error in request");
        const jwtToken = user.generateJWT();
        res.status(200).send({jwtToken});
    } catch (error) {
        return res.status(401).send("Error in request")
    }
});

router.post("/newAdmin", Auth, UserAuth, AdminAuth, async(req,res) => {   
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.roleId)
        return res.status(401).send("Rejected request: Incomplete data");

    const validRoleId = mongoose.Types.ObjectId.isValid(req.body.roleId);
    if (!validRoleId) return res.status(401).send("Rejected request: Invalid role id");

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(401).send("Rejected request: This user already exists");

    const hash = await bcrypt.hash(req.body.password, 10);
    user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        roleId: req.body.roleId,
        status: true
    })
    
    try {
        const result = await user.save();
        if (!result) return res.status(401).send("Error in request");
        const jwtToken = user.generateJWT();
        res.status(200).send({jwtToken});
    } catch (error) {
        return res.status(401).send("Error in request")
    }
});

router.get("/getUsers/:name?", Auth, UserAuth, AdminAuth, async (req, res) => {
    const users = await User.find({name: new RegExp(req.params["name"], "i")})
                            .populate("roleId")
                            .exec();
    if (!users) return res.body.status(401).send("Error in request");
    return res.status(200).send({users})
});

router.put("/updateUser", Auth, UserAuth, AdminAuth, async(req, res) => {
    if (!req.body._id ||
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.roleId)
        return res.status(401).send("Rejected request: Incomplete data");
    
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        roleId: req.body.roleId,
        status: req.body.status
    });
    if (!user) return res.status(401).send("Error in request");
    return res.status(200).send({user})
})

router.put("/delete", Auth, UserAuth, AdminAuth, async(req, res) => {
    if (!req.body._id ||
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.roleId)
        return res.status(401).send("Rejected request: Incomplete data");
    
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        roleId: req.body.roleId,
        status: false
    });
    if (!user) return res.status(401).send("Error in request");
    return res.status(200).send({user})
});

router.delete("/delete/:_id?", Auth, UserAuth, AdminAuth, async(req, res) => {
    const validId = mongoose.Types.ObjectId.isValid(req.params._id);
    if (!validId) return res.status(401).send("Rejected requet: Invalid Id");
    const user = await User.findByIdAndDelete(req.params._id);
    if(!user) return res.status(400).send("Error in request");
    return res.status(200).send("User deleted");
})

module.exports = router;