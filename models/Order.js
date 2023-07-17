import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    phone:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    bucket:{
        type:Array,
        required:true
    },
    totalPrice: {
        type:Number,
        required:true,
    },
    fullName: {
        type:String,
        default:'',
    },
    userId: {
        type:String,
        default:'',
    },
    additionalInfo:{
        type:String,
        default:'',
    }},
    {
        timeStamps: true,
    },
);

export default mongoose.model('Order', OrderSchema);