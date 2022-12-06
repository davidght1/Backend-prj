import express from "express";
import mongoose from "mongoose";
import multer from 'multer';

import { registerValidation,loginValidation } from './validations/auth.js'
import { postCreateValidation } from './validations/post.js'

import * as userController from './controllers/userControllers.js'
import * as postController from './controllers/PosControllers.js'



import checkAuth from './utlis/checkAuth.js'
import handleValidationErrors from "./utlis/handleValidationErrors.js";

mongoose.connect('mongodb+srv://admin:admin@cluster0.otffmeq.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=>{
    console.log('db ok');
})
.catch((err)=>{
    console.log('db error', err);
})

const app = express();

const storage = multer.diskStorage({
    destination: (_,__, cb)=>{
        cb(null, 'uploads')
    },
    filename: (_,file, cb)=>{
        cb(null, file.originalname)
    }
});

const upload = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'));
//users
app.post('/auth/login', loginValidation , handleValidationErrors, userController.login)
app.post('/auth/register' , registerValidation ,handleValidationErrors, userController.register)
app.get("/auth/me", checkAuth , userController.checkLogin)

//multer
app.post('/uploads',checkAuth, upload.single('image'), (req,res)=>{
    res.json({
        url: `/uploads'${req.file.originalname}`,
    })
})

//posts
app.get('/post', postController.getAll);
app.get('/post/:id', postController.getOne);
app.post('/post',checkAuth, postCreateValidation ,handleValidationErrors,  postController.create);
app.delete('/post/:id', checkAuth, postController.remove);
app.patch('/post/:id', checkAuth, postCreateValidation ,handleValidationErrors, postController.update);



app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }

    console.log('server ok')
});
