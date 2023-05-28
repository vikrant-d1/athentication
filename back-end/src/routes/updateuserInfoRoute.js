import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";


export const updateUserInfo = {
    path: '/api/user/:userId',
    method: 'put',
    handler: async (req, res) => {
        const {authorization} = req.headers;
       const {userId} = req.params;

       
    
    },
};