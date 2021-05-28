function validateData(req, res, next) {
    const {name, email, password} = req.body;
    if(!name) { 
        return res.status(400).send("No se envió el nombre");
    }
    if(!email) { 
        return res.status(400).send("No se envió el email");
    }
    if(!password) { 
        return res.status(400).send("No se envió el password");
    }
    next();
}

module.exports = validateData;