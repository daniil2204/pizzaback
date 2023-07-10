import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';



export const register = async (req,res) => {
    try{
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            role:'user',
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', 
        {
            expiresIn: '30d',
        });

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData,token});
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Register Error',
        })
    }
};


export const login = async (req,res) => {
    try{
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message:'User not found'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(404).json({
                message:'Invalid login or password',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', 
        {
            expiresIn: '30d',
        });

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData,token});

    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Login Error',
        })
    }
};


export const getMe = async (req,res) => {
    try{
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message:'User not found',
            })
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', 
        {
            expiresIn: '30d',
        });

        const {passwordHash, ...userData} = user._doc;


        res.json({...userData,token});
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'User not found',
        })
    }
};

export const changeBucket = async (req,res) => {
    try{
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message:'User not found',
            })
        }
        user.bucket = req.body.bucket;
        const changedUser = await UserModel.updateOne({
            _id:req.userId
        }, {
            user,
            bucket:req.body.bucket,
            bucketLenght:req.body.count,
            totalPrice:req.body.totalPrice,
        },);
        res.json({user});
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'User not found',
        })
    }
};