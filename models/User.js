import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullName: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique:true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type:String,
        default: 'user',
    },
    bucket: {
        type:Array,
        default: [],
    },
    bucketLenght: {
        type:Number,
        default: 0,
    },
    totalPrice: {
        type:Number,
        default: 0,
    }
    }, {
        timeStamps: true,
    },
);

export default mongoose.model('User', UserSchema);