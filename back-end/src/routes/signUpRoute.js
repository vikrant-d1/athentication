import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
       const {email,password} = req.body;
       const db = getDbConnection('react-db');
       const user = await db.collection('users').findOne({email})

       if(user){
         return res.status(200).json({
            msg:'user already exist.',
            status:200
        })
       }

       const passwordHash = await bcrypt.hash(password,10);

       const stringInfo = {
        hairColor:'',
        favaritColor:'',
        bio:''
       }

       const result = await db.collection('users').insertOne({
        email,
        passwordHash,
        info:stringInfo,
        isVerified:false
       })

       const { insertedId } = result;
       
       jwt.sign({ 
        insertedId,
        email,
        passwordHash,
        info:stringInfo,
        isVerified:false},
        process.env.JWT_SECRET,
       {expiresIn:'2d'},
       (err,token)=>{
        if(err){
            return res.status(200).json({
                msg:err.message,
                status:200
            })
        }

        res.status(200).json({token})
           
       })


    },
};