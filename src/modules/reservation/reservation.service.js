import { Reservation } from "../../db/models/reservation.model.js";
import { Showtime } from "../../db/models/showtime.model.js";

export const createReservation = async(req, res,next)=>{
    try {
        const{showtimeId, seats} = req.body;
        //check data from req
        if(!showtimeId|| !seats || !Array.isArray(seats)|| seats.length===0){
            return res.status(400).json({success:false, message:"invalid data"});
        }
        //get showtime
        const showtime = await Showtime.findById(showtimeId);
        if(!showtime){
      return res.status(404).json({message:"showtime not found"});
       }
       //check seats not reservation
       const reserved = seats.some(seat=> showtime.reservedSeats.includes(seat))
       if(reserved){
      return res.status(409).json({ success:false, message:"one or more seats are reserved"});
       }
       //calculate price
       const totalPrice = seats.length*showtime.price;
       //update reserved seats in showtime
       showtime.reservedSeats.push(...seats);
       await showtime.save();

       const reservation = await Reservation.create({
        user: req.authUser._id,
        showtime:showtimeId,
        seats,
        totalPrice
});
       const populateReservation = await Reservation.findById(reservation._id)
       .populate([
        {
        path:"showtime",
        select:"movieId startTime price"
       },{
        path:"user",
        select:"userName email"
       }
    ]);
       return res.status(200).json({
        success:true,
        message:"reservation created successfully",
        data:populateReservation
       });

    } catch (error) {
        next (error)
    }
};

export const getAllReservation = async(req, res,next)=>{
    const reservation = await Reservation.find({}).populate([
        {
            path:"user",
            select:"userName email"
        },{
            path:"showtime",
            select:"movieId satrtTime price"
        }
    ]);
    return res.status(200).json({success:true, data:reservation})

};

export const getSpecificReservation = async(req, res,next)=>{
    const{reservationId} = req.params;
    const reservation = await Reservation.findById(reservationId).populate([
        {
            path:"user",
            select:"userName email"
        },{
            path:"showtime",
            select:"movieId satrtTime price"
        }
    ]);
    if(!reservation){
        return res.status(404).json({message:"reservation not found"});
    }
    return res.status(200).json({success:true, data:reservation})

};

export const cancelReservation= async(req, res,next)=>{
    try {
        const{reservationId} =req.params;
        const reservation = await Reservation.findById(reservationId);
       if(!reservation){
        return res.status(404).json({success:false, message: "reservation not found"});
    }
    if(reservation.status ==="canceled"){
        return res.status(400).json({success:false, message: "reservation already canceled"});
    }
    const showtime = await Showtime.findById(reservation.showtime);
    if(!showtime){
        return res.status(404).json({success:false, message: "showtime not found"});
    }

    showtime.reservedSeats = showtime.reservedSeats.filter(
        seat=>!reservation.seats.includes(seat)
    );
    await showtime.save();
    reservation.status="canceled";
    await reservation.save();

    return res.status(200).json({
        success: true,
        message: "reservation canceled successfully"
    });

    } catch (error) {
        next(error)
    }
}