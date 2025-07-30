import { Schema, model, Types } from "mongoose";
const showtimeSchema = new Schema({
  movieId:{
    type: Types.ObjectId,
    ref:"Movie",
    required: true
  },
  startTime:{
    type:Date,
    required:true
    },
  endTime:{
    type:Date,
    required:true
    },

  price:{
    type: Number,
    required:true,
    min: 0
    },
  totalSeats:{
    type: Number,
    required: true,
    min: [1,"at least one seat is required"]
  },
  reservedSeats:{
    type:[Number],
    default:[],
    validate:{
      validator:function(arr){
        return arr.every(seat=> seat >0 &&seat<= this.totalSeats);
      },
      message:"one or more reserved seat numbers are invalid"
    }
  },
  roomNumber:{
    type: Number,
    default:1 
  }
},{timestamps:true}
);

export const Showtime = model("Showtime",showtimeSchema);