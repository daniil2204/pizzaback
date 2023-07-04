import express from "express";

import mongoose from "mongoose";

import multer from 'multer';

import { registerValidation, loginValidation } from './validations/auth.js'
;
import { createPizzaValidation } from './validations/pizza.js'

import {checkAuth,handleValidationErrors } from './utils/index.js'

import { UserControllers, PizzaControllers } from './controllers/index.js'

import cors from 'cors';


mongoose.connect('mongodb+srv://admin:adminpass@cluster0.tgalmb3.mongodb.net/pizzaBack?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB is ok');
    })
    .catch((err) => {
        console.log(err);
        console.log('DB error');
    })

const app = express();

const storage = multer.diskStorage({
    destination: (_,__,cb) => {
        cb(null,'uploads');
    },
    filename: (_,file,cb) => {
        cb(null,file.originalname);
    },
});

const upload = multer({ storage })

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('/uploads'));


app.post('/auth/register', registerValidation,handleValidationErrors, UserControllers.register);

app.post('/auth/login',  loginValidation,handleValidationErrors, UserControllers.login);

app.get('/auth/me', checkAuth , UserControllers.getMe)

app.get('/pizza', PizzaControllers.getAll);

app.get('/pizza/:id', PizzaControllers.getOne);

app.post('/pizza',createPizzaValidation,handleValidationErrors, PizzaControllers.create);

app.delete('/pizza/:id', PizzaControllers.remove);

app.patch('/pizza/:id',createPizzaValidation,handleValidationErrors, PizzaControllers.update);

app.post('/upload', upload.single('image'), (req,res) => {
    res.json({
        url:`/uploads/${req.file.originalname}`,
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server ok');
})