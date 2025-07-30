import { Schema, model, Types } from "mongoose";
export const reservationStatus ={
  CONFIRMED:"confirmed",
  CANCELED: "canceled"
};

const reservationSchema = new Schema({
  user: {
  type: Types.ObjectId,
  ref: "User",
  required: true,
},
showtime: {
  type: Types.ObjectId,
  ref: "Showtime",
  required: true,
},
seats: {
  type: [Number],
  required: true,
  validate: {
  validator: function (arr){
    return arr.length> 0 &&arr.every(num=> num >0);
    },
    message:"seats must be an array of positive numbers"
  }
  },
  totalPrice:{
    type: Number,
    required:true,
    min:[0,"total price must be a positive number"]
  },
  status:{
    type:String,
    enum:Object.values(reservationStatus),
    default: reservationStatus.CONFIRMED
  }
},{
  timestamps: true
});
export const Reservation = model("Reservation", reservationSchema);
