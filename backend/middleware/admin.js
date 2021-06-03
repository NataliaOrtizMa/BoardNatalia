const Role = require("../models/role");

const AdminAuth = async(req, res, next) => {
    const role = await Role.findById(req.user.roleId);
    if(!role) return res.status(401).send("Rejected request: Inexistent role");
    if (role.name != "admin") return res.status(401).send("Rejected request: Unauthorized user");
    next();
}

module.exports = AdminAuth;