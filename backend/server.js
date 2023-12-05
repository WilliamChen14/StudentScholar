const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const File = require("./models/file");


const multer = require('multer');
const upload = multer({dest: "uploads/"})
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Grid = require('gridfs-stream');


const cors = require('cors');

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));


const uri = "mongodb+srv://billchen:billchen1@studentscholar.0gb3r1q.mongodb.net/StudentScholar?retryWrites=true&w=majority";

const conn = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

app.post('/add-user', (req,res)=>{
    User.create(req.body)
        .then((result) =>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        });
})

app.post('/add-file', (req,res)=>{
    File.create(req.body)
        .then((result) =>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
})

app.delete('/delete-users', async (req,res) =>{

    try {
        const result = await(User.deleteMany())
        res.send(result)
    } catch (err) {
        console.log(err);
    }

})

let gfs;
conn.once('open', () => {
    console.log("Connected")
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});


app.post("/file-upload", upload.single("file"), uploadFiles);

function uploadFiles(req, res) {

    console.log("I think the upload worked")
    console.log(req.body);
    console.log(req.file);
    res.json({ message: "Successfully uploaded files" });
}

const path = require("path")
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
