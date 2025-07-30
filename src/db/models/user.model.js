import { model, Schema } from "mongoose";
import { hash } from "../../utils/hash/hash.js";
export const genders={
    MALE: "male",
    M:"m",
    F:"f",
    FEMALE: "female", 
};
export const roles={
    USER:"user",
    ADMIN:"admin",
};
const userSchema = new Schema({
    email: {type: String, required: true,unique: [true, "email already exist"], lowercase: true},
    password: {type:String, required:true},
    userName:{
    type: String,
    required: true,
    minLength:2,
    maxLength:20,
    unique: [true, "userName already exist"]
    },
    phone:{type:String, required:true},
    gender: {type:String, enum: Object.values(genders)},
    role :{type: String, enum:Object.values(roles), default: roles.USER},

},
    {timestamps: true}

);
//hokes
userSchema.pre("save",function(next){
    if(this.isModified("password"))
        this.password=hash({password:this.password});
    return next()
});
export const User = model("User",userSchema);