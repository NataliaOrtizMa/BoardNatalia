const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Board = require("../models/board");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Upload = require("../middleware/file");
const AdminAuth = require("../middleware/admin");

router.post("/createTask", Auth, UserAuth, async(req, res) => {
    if (!req.body.name || !req.body.description)
        return res.status(401).send("Rejected request: Incomplete data");

    const board = new Board ({
        userId: req.user._id,
        name: req.body.name,
        description: req.body.description,
        status: "to-do",
        imageUrl: "http://localhost:4001/uploads/task-image.jpg"
    }); 
    const result = await board.save();
    if (!result) return res.status(401).send("Error in request");
    return res.status(200).send({result});
});

router.put("/uploadImage", Upload.single("image"), Auth, UserAuth, async(req, res) => {
    if (!req.body._id ||
        !req.body.name ||
        !req.body.description ||
        !req.body.status)
        return res.status(401).send("Rejected request: Incomplete data");
    
    if (!req.file) return res.status(401).send("No file found")
    if (req.file) {
        if (req.file.mimetype !== "image/png" &&
            req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/jpeg" &&
            req.file.mimetype !== "image/bmp" &&
            req.file.mimetype !== "image/gif") 
            return res.status(401).send("Accepted formats .png .jpg .jpeg .bmp .gif");
    };

    const url = req.protocol + "://" + req.get("host");
    let imageUrl = "";
    if (req.file !== undefined || req.file.filename) {
        imageUrl = url + "/uploads/" + req.file.filename;
    }

    const board = await Board.findByIdAndUpdate(req.body._id, {
        userId: req.user._id,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        imageUrl: imageUrl
    });
    
    const result = await board.save();
    if (!result) return res.status(401).send("Error in request");
    return res.status(200).send({result});

})

router.get("/getTasks", Auth, UserAuth, async(req,res) => {
    const validId = mongoose.Types.ObjectId.isValid(req.user._id);
    if(!validId) return res.status(401).send("Rejected request: Invalid Id");
    const board = await Board.find({userId: req.user._id});
    if (!board) return res.status(401).send("Error in request");
    return res.status(200).send({board});
});

router.get("/getBoards/:name?", Auth, UserAuth, AdminAuth, async (req, res) => {
    const boards = await Board.find({name: new RegExp(req.params["name"], "i")})
                            .populate("userId")
                            .exec();
    if (!boards) return res.body.status(401).send("Error in request");
    return res.status(200).send({boards})
});

router.put("/editTask", Auth, UserAuth, async(req, res) => {
    if (!req.body._id ||
        !req.body.name ||
        !req.body.description ||
        !req.body.status ||
        !req.body.imageUrl)
        return res.status(401).send("Rejected request: Incomplete data");
    
    const validId = mongoose.Types.ObjectId.isValid(req.user._id);
    if (!validId) return res.status(401).send("Rejected request: Invalid Id");

    const board = await Board.findByIdAndUpdate(req.body._id, {
        userId: req.user._id,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        imageUrl: req.body.imageUrl,
    })
    if(!board) return res.status(401).send("Error in request");
    return res.status(200).send({board});
});

router.put("/deleteTask", Auth, UserAuth, async(req, res) => {
    if (!req.body._id ||
        !req.body.name ||
        !req.body.description ||
        !req.body.imageUrl)  
        return res.status(401).send("Rejected request: Incomplete data");
    const board = await Board.findByIdAndUpdate(req.body._id, {
        userId: req.user._id,
        name: req.body.name,
        description: req.body.description,
        status: "false",
        imageUrl: req.body.imageUrl,
    })
    if(!board) return res.status(401).send("Error in request");
    return res.status(200).send({board});
    
})

router.delete("/deleteTask/:_id", Auth, UserAuth, async(req, res) =>{
    const validId = mongoose.Types.ObjectId.isValid(req.user._id);
    if (!validId) return res.status(401).send("Rejected request: Invalid Id");
    const board = await Board.findByIdAndDelete(req.params._id);
    if(!board) return res.status(401).send("Error in request");
    return res.status(200).send("Task Deleted");
})

module.exports = router;
