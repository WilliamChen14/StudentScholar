const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");



const app = express();



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

app.get('/add-user', (req,res) => {
    const user = new User({
        username: "bill1",
        password: "bill1"
    })

    user.save()
        .then((result) =>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        });
})

app.get('/all-users', (req,res)=>{
    User.find()
        .then((result) =>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        });
})

app.get('/single-user', (req,res)=>{
    User.findById('6559222ed0daf78b436c442c')
        .then((result) =>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        });
})