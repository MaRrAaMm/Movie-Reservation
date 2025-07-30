export const genres ={
  ACTION: "action",
  COMEDY: "comedy",
  HORROR: "horror",
  DRAMA: "drama",
};
import { model, Schema, Types } from "mongoose";
const movieSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    genre:{
        type:String,
        enum:Object.values(genres),
        required:true
    },
    createdBy:{
        type:Types.ObjectId,ref:"User",required:true
    },
    poster: {
  secure_url:{type: String, required: true},
  public_id:{type: String, required: true},
},
duration:{
  type: Number,
  required: true,
}

},{
  timestamps: true
}
);
export const Movie = model("Movie", movieSchema);
