const express = require('express');
const cors= require('cors');
const app= express();
require("dotenv").config();

const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
 

const mainRouter = require('./routes/index');

app.use("/api/v1",mainRouter);

app.get("/",(req,res)=>{
    console.log("HIi There")
    res.send("HEllo World")
})

app.listen(PORT,()=>{
    console.log("App is listening on 4000")
})