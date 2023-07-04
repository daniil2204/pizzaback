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
    phoneNumber: {
        type: Number,
        required:true,
    },
    }, {
        timeStamps: true,
    },
);

export default mongoose.model('User', UserSchema);