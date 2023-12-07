const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const File = require("./models/file");
const Class = require("./models/class");

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

app.post('/add-class', async (req, res) => {
    try {
        console.log(req.body.userClasses);
        const tempUser = await User.findOneAndUpdate({username: req.body.username},
            {
                userClasses: req.body.userClasses
            }
        );
    }
    catch(err){
        console.log(err);
    }
})

app.post('/get-user-classes', async (req,res)=>{
    try {
        const userClasses = await User.find({username: req.body.username},{
            userClasses: 1,
            _id: 0
        })
        res.send(userClasses);
    }
    catch(err){
        console.log(err);
    }
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

app.post('/create-class', async (req,res)=>{

    const tempClass = await Class.findOne({classID: req.body.classID});
    if(tempClass){
        console.log("classid already exists");
    }
    else{
        Class.create(req.body)
        .then((result) =>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
    }
})

app.post('/get-class', async (req,res)=>{
    const tempClass = await Class.findOne({classID: req.body.classID});
    if(tempClass){
        res.send(tempClass);
    }
    else{
        console.log('Class doesnt exist');
    }
})

app.post('/get-class-discussion', async (req,res)=>{
    const tempClass = await Class.findOne({classID: req.body.classID});
    if(tempClass){
        console.log(tempClass);
        res.send(tempClass);
    }
    else{
        console.log('Class Doesnt exist');
    }
})

app.post('/update-class-discussion', async (req,res)=>{
    try {
        await Class.findOneAndUpdate({classID: req.body.classID}, {
            classConversation: req.body.classConversation
        })
    }
    catch(err){
        console.log(err);
    }
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
    console.log(req.body)

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileData = {
        fileName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        className: req.body.className,
        description: req.body.description,
        uploaderName: req.body.uploaderName
        // You can include any other relevant file metadata here
      };
    console.log(fileData);
    
    const newFile = new File(fileData);

    newFile.save()
    .then(() => res.status(201).send({
      message: 'File new layout uploaded successfully',
      file: fileData
    }))
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: 'Error uploading file new layout',
        error: err
      });
    });

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

app.post('/get-class-files', async (req, res) => {

    console.log("HERE")
    const className = req.body.className;

    // let className = "";

    // for(let i = 0; i < classNameWithSpecialChars.length; i++){
    //     if(i < classNameWithSpecialChars.length - 2 && classNameWithSpecialChars.substring(i, i + 2) == "%20"){
    //         className = className + " ";
    //         i = i + 3;
    //     } else {
    //         className = className + classNameWithSpecialChars[i];
    //     }
    // }

    // console.log(className);
  
    try {
        // Debugging function call: findFileById();
        // const allFiles = await File.find({});
      const files = await File.find({ className: className });
      res.json(files);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving files');
    }
  });
// Debugging function 
// const idToFind = "6570010f95e3792e65d1fb99"; // Replace with the actual _id

// async function findFileById() {
//   try {
//     const file = await File.find({className: "MATH 33B"});
//     if (file) {
//       console.log('Found file:', file);
//     } else {
//       console.log('No file found with that id');
//     }
//   } catch (err) {
//     console.error('Error finding file:', err);
//   }
// }

let gfs_getFiles;
mongoose.connection.once('open', () => {
    gfs_getFiles = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'files'
    });
  });

  app.post('/get-file-contents', async (req, res) => {

    console.log("TRYING TO GET FILE CONTENTS!!!");
    const fileName = req.body.fileName;
    console.log("For this filename: " + fileName);

    try {
        const files = await gfs_getFiles.find({ filename: fileName }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).send('File not found');
        }

        const readStream = gfs_getFiles.openDownloadStreamByName(fileName);
        readStream.pipe(res);
    } catch (err) {
        console.error('Error finding file:', err);
        res.status(500).send('Internal server error');
    }

  });