const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connection with MongoDB: ON")
    } catch (error) {
        return console.log("Error connecting to MongoDB");
    }
}

module.exports = {dbConnection};
