import { User } from "../../db/models/user.model.js";
import { encrypt } from "../../utils/crypto/encrypt.js";
import { asyncHandler } from "../../utils/error/async-handler.js";
import { compare } from "../../utils/hash/compare.js";
import { generaToken } from "../../utils/token/generate-token.js";

export const register = async(req, res , next)=>{
    //get data from req
    const {userName, email, password, phone} = req.body;
    //create user
    const createUser = await User.create({
        userName,
        email,
        password,
        phone:encrypt({plaintext:phone})
    });
    // send response
    return res.status(201).json({
        success: true,
        message: "user created successfully",
        data: createUser,
    });
};
export const login = asyncHandler(async(req, res ,next)=>{
    //get data from req
    const {email, password}= req.body;
    const userExist = await User.findOne({email});
    if(!userExist){
        return next(new Error("email not found",{cause:401}));
    }
    if(userExist.isDeleted==true){
        await User.updateOne({_id:userExist._d},{isDeleted:false});
    }
    const match = compare({password,hashedPassword:userExist.password});
    if (!match){
        return next(new Error("invalid password",{cause:401}));
    };

    //token 
    const accessToken = generaToken({
        payload:{email, id:userExist._id},
        options:{expiresIn:"2h"}
    });
    // send response
    return res.status(200).json({
        success:true,
        message:"login successfully",
        access_token:accessToken,
    });
});