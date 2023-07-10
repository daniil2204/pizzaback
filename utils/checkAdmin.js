import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';


export default async (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Basic\s?/, '');

    if (token) {
        try{
            const decoded = jwt.verify(token, 'secret123');

            req.userId = decoded._id;
            const user = await UserModel.findOne({ _id: decoded._id });
            if (user.role === 'admin') {
                next();
            }else{
                return res.status(403).json({
                    message: 'No access!!!',
                })
            }   
        }catch(err){
            return res.status(403).json({
                message: 'No access!!',
            })
        }
    }else{
        return res.status(403).json({
            message: 'No access token',
        })
    }
    
}