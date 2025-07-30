import { roles, User } from "../../db/models/user.model.js";

export const getAllUsers = async (req, res, next) =>{
  const users = await User.find().select("-password")
  return res.status(200).json({ success: true, data: users});
};

export const updateRole = async(req, res, next)=>{
  const {userId, role} = req.body;
  const updateRole = await User.findByIdAndUpdate(
    userId,
    {role},
    {new:true}
  );
  return res.status(200).json({ success: true, data: updateRole});
};

export const deleteUser = async (req, res, next) => {
  const { id} = req.params;
  await User.findByIdAndDelete(id);
  return res.json({ success: true, message: "user deleted"});
};