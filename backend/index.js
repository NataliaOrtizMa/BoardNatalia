const express = require("express");
const mongoose = require("mongoose");

const User = require("./routes/user")
const Auth = require("./routes/auth");

const app = express();

app.use(express.json());
app.use("/api/user", User);
app.use("/api/auth", Auth);

const port = process.env.PORT || 4001;

app.listen(port, () => console.log("Servidor ejecutando en puerto: " + port))

mongoose.connect("mongodb://127.0.0.1:27017/BoardNatalia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log("Conexion con MongoDB: ON"))
.catch((err) => console.log("Error al conectar con MongoDB: ", err))