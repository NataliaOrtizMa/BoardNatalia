function validateBoard(req, res, next) {
    const {name, description} = req.body;
    if(!name) { 
        return res.status(400).send("No se envió el nombre");
    }
    if(!description) { 
        return res.status(400).send("No se envió la descripción");
    }
    next();
}

module.exports = validateBoard;