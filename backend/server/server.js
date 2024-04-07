//server.js

const express = require("express");
const app = require("../App");
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/`);
})