const User = require("../models/user");

const UserAuth = async(req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).send("Process failed: Error in user");
    next();
};

module.exports = UserAuth;
