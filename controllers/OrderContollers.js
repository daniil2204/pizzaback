import OrderModel from "../models/Order.js";

export const makeOrder = async (req,res) => {
    try{
        const doc = new OrderModel({
            phone: req.body.phone,
            location: req.body.location,
            bucket: req.body.bucket,
            additionalInfo: req.body.additionalInfo,
            totalPrice:req.body.totalPrice,
            fullName:req.body.fullName,
            userId:req.body.userId,
        });

        const order = await doc.save();

        res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Make Order Error',
        })
    }
};


export const getAllOrders = async(req,res) => {
    try{
        const orders = await OrderModel.find();
        res.json(orders);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Fetch Order Error',
        })
    }
}

export const remove = async(req,res) => {
    try{
        const orderId = req.params.id;

        await OrderModel.deleteOne({_id:orderId});
        res.json({
            success:true,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Remove Order Error',
        })
    }
}
