const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const File = require("./models/file");

const cors = require('cors');



const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));



const uri = "mongodb+srv://billchen:billchen1@studentscholar.0gb3r1q.mongodb.net/StudentScholar?retryWrites=true&w=majority";

async function connect(){
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error){
        console.error(error);
    }
}

connect();

app.listen(8000,() => {
    console.log("Server started on port 8000")
})

app.post('/loggin-user', async (req, res) => {
    try {
        console.log(req.body.username);
        const tempUser = await User.findOne({username: req.body.username});
        console.log(tempUser);
        if(!tempUser){
            User.create(req.body);
        }
        console.log("done");
    }
    catch(err){
        console.log(err);
    }
});

app.post('/add-file', (req,res)=>{
    File.create(req.body)
        .then((result) =>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
})