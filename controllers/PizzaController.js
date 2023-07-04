import PizzaModel from "../models/Pizza.js";

export const create = async (req,res) => {
    try{
        const doc = new PizzaModel({
            imageUrl: req.body.imageUrl,
            name: req.body.name,
            types: req.body.types,
            sizes: req.body.sizes,
            price: req.body.price,
            category: req.body.category,
        });

        const pizza = await doc.save();

        res.json(pizza);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Create Pizza Error',
        })
    }
};

export const getAll = async(req,res) => {
    try{
        const pizzas = await PizzaModel.find();
        res.json(pizzas);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Fetch Pizza Error',
        })
    }
}

export const getOne = async(req,res) => {
    try{
        const pizzaId = req.params.id;
        const pizza = await PizzaModel.findById(pizzaId);
        res.json(pizza);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Fetch Pizza Error',
        })
    }
}

export const remove = async(req,res) => {
    try{
        const pizzaId = req.params.id;

        PizzaModel.deleteOne({_id:pizzaId});

        res.json({
            success:true,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Remove Pizza Error',
        })
    }
}

export const update = async(req,res) => {
    try{
        const pizzaId = req.params.id;
        const pizza = await PizzaModel.updateOne({
            _id:pizzaId
        }, {
            imageUrl: req.body.imageUrl,
            name: req.body.name,
            types: req.body.types,
            sizes: req.body.sizes,
            price: req.body.price,
            category: req.body.category,
        },);
        res.json({
            success:true
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Update Pizza Error',
        })
    }
}