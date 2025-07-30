import { User } from "../../db/models/user.model.js";

export const getUser = async (req, res, next) =>{
    try {
         // get data from req
         const userExist = req.authUser;
        return res.status(200).json({
            success: true,
            data:userExist,
        }); 
    } catch (error){
        return res.status(500).json({
            success: false,
            message: "server error",
        });
    }
};

export const updateUser = async(req, res, next) =>{

    const{ userName, email} = req.body;
    // find user
    const user = await User.findById(req.authUser._id);
    if(!user) return next(new Error("user not found",{cause:404}));
    if(email && email !== user.email){
      const existingEmail = await User.findOne({email});
      if(existingEmail){
        return res.status(409).json({success: false,message:"email already in use"});
      }
      user.email = email;
    }
    if(userName && userName !== user.userName){
      const existingUserName = await User.findOne({userName});
      if(existingUserName){
        return res.status(409).json({success: false, message: "username already in use"});
      }
      user.userName = userName;
    }
    await user.save();
    return res.status(200).json({
        success: true,
        message: "user updated successfully",
         data:{
        userName:user.userName,
        email:user.email,
        role:user.role,
        gender:user.gender,
      },
    });
};



