import mongoose from "mongoose";

const PizzaSchema = mongoose.Schema({
    imageUrl: {
        type:String,
        required: true,
    },
    name: {
        type:String,
        required: true,
        unique:true,
    },
    types: {
        type: Array,
        required: true,
    },
    sizes: {
        type: Array,
        required: true,
    },
    price: Number,
    category: {
        type: Array,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        required: true,
    }
    }, {
        timeStamps: true,
    },
);

export default mongoose.model('Pizza', PizzaSchema);