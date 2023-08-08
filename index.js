const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});
const multer = require('multer');

const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/usersRoutes');
const postRoute = require('./routes/postsRoutes');
const categoryRoute = require('./routes/categoriesRoutes');

const app = express();
app.use(express.json());

//GET DATABASE CONNECTION FROM ATLAS
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


//CONNECT DB
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>console.log("DB connection succesfull!"));


const storage = multer.diskStorage({
    destination : (req, res, cb) =>{
        cb(null, 'images');
    },
    filename : (req, res, cb) =>{
        cb(null, "Hello.jpeg");
    }
});

const upload = multer({ storage: storage});
app.post("/api/upload", upload.single("file"), (Req, res)=>{
    res.status(200).json("File uploaded...");
});


//ROUTES
app.use('/api/auth',authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);


const port = 3000 || process.env.PORT
app.listen(port, ()=>{
    console.log(`App is listening on post ${port}`);
})
