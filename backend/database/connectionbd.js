// conectionbd.js

const mongoose = require("mongoose");
require("dotenv").config();

const connectionbd = async (_, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Conexión exitosa a MongoDB Compass!`);
    } catch (error) {
        console.log(`Error al conectar a MongoDB Compass: ${error.message}`);
    }
}

module.exports = connectionbd;