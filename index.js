import express from "express";

import mongoose from "mongoose";

import { registerValidation, loginValidation } from './validations/auth.js';

import { createPizzaValidation } from './validations/pizza.js'

import {checkAuth,handleValidationErrors,checkAdmin } from './utils/index.js'

import { UserControllers, PizzaControllers, OrderControllers } from './controllers/index.js'

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


app.use(express.json());
app.use(cors());


app.post('/auth/register', registerValidation,handleValidationErrors, UserControllers.register);

app.post('/auth/login',  loginValidation,handleValidationErrors, UserControllers.login);

app.post('/auth/bucket',checkAuth,handleValidationErrors, UserControllers.changeBucket);

app.post('/order',handleValidationErrors, OrderControllers.makeOrder);

app.get('/order',checkAuth,checkAdmin,OrderControllers.getAllOrders);

app.delete('/order/:id', checkAuth,checkAdmin,OrderControllers.remove);

app.get('/auth/me', checkAuth, UserControllers.getMe)

app.get('/pizza',  PizzaControllers.getAll);

app.get('/pizza/:id', PizzaControllers.getOne);

app.post('/pizza' ,checkAuth,checkAdmin,createPizzaValidation,handleValidationErrors, PizzaControllers.create);

app.delete('/pizza/:id', checkAuth,checkAdmin,PizzaControllers.remove);

app.patch('/pizza/:id',checkAuth,checkAdmin,createPizzaValidation,handleValidationErrors, PizzaControllers.update);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server ok');
})