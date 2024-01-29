require ("./config/configdb.js");

const express = require ("express");
const bodyParser = require('body-parser');
const fileUploader = require("express-fileupload")

const port = process.env.PORT || 4000;
const userRoutes= require("./router/userRoutes.js");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUploader({
    useTempFiles: true,
}))

app.use("/api", userRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);   
})