const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const File = require("./models/file");

const { v4: uuidv4 } = require('uuid');


const multer = require('multer');

// const storage = multer.memoryStorage();

// const upload = multer({ storage })

const {GridFsStorage} = require('multer-gridfs-storage');
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

async function connect(){
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error){
        console.error(error);
    }
}

connect();

app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
});

app.post('/login', async (req, res) => {

    try {
        console.log(req.body.username);
        let username = req.body.username;
        const tempUser = await User.findOne({username: req.body.username});
        if(!tempUser){
            User.create(req.body);
        }

        res.send({accessToken: username});

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

// let gfs;
// conn.once('open', () => {
//     console.log("Connected")
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('files');
// });

// Create storage engine
// const storage = new GridFsStorage({
//   url: uri,
//   file: (req, file) => {
//     // const id = uuidv4(); // Generate a unique ID for the file
//     console.log(file);
//     // console.log(id);

//     return {
//       // id: id,
//       filename: file.originalname,
//       bucketName: 'files'
//     };
//   }
// });

// const upload = multer( { storage } ); 


// app.post("/file-upload", upload.single("file"), uploadFiles);
    
// function uploadFiles(req, res) {
//     storage.
//     console.log("I think the upload worked")
//     console.log(req.body);
//     console.log(req.file);
//     res.json({ message: "Successfully uploaded files" });
// }

// const path = require("path")
// app.use('/uploads', express.static(path.join(__dirname, 'files')));

// app.post('/file-upload', upload.single('file'), async (req, res) => {
    
//     console.log(req.file)

//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }

//     try {
//         // The file is automatically stored in MongoDB using GridFS,
//         // you can perform additional actions if needed
//         res.status(201).send({
//             message: 'File uploaded successfully',
//             file: req.file
//         });
//     } catch (err) {
//         res.status(500).send({
//             message: 'Error uploading file',
//             error: err
//         });
//     }
// });


const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
      return {
        filename: file.originalname,
        bucketName: 'files' // This should match the name of your GridFS bucket
      };
    }
  });

  
const upload = multer({ storage });
app.post('/file-upload', upload.single('file'), (req, res, next) => { 
    /*....*/ 

    console.log(req.file)

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // The file is automatically stored in MongoDB using GridFS,
        // you can perform additional actions if needed
        res.status(201).send({
            message: 'File uploaded successfully',
            file: req.file
        });
    } catch (err) {
        res.status(500).send({
            message: 'Error uploading file',
            error: err
        });
    }
});

