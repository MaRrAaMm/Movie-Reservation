import { Movie } from "../../db/models/movie.model.js";
import { Showtime } from "../../db/models/showtime.model.js";

export const createShowtime = async(req ,res ,next)=>{
  try{
    const {movieId,startTime, price, totalSeats,reservedSeats, roomNumber}=req.body;

    const movie = await Movie.findById(movieId);
     if (!movie){
      return res.status(404).json({message: "movie not found"});
    }
    // const durationInMs = 1000
    const start = new Date(startTime);
    const end = new Date(start.getTime()+ (movie.duration+30) * 60 * 1000);   
    const newShowtime= await Showtime.create({
      movieId,
      startTime:start,
      endTime:end,
      price,
      totalSeats,
      reservedSeats:reservedSeats|| [],
      roomNumber  
    });
  return res.status(201).json({message:"showtime created", date:newShowtime})
  }catch(error){
    next(error)
  }
}

export const getAllShowtime = async(req,res,next)=>{
  const showtime = await Showtime.find({}).populate([
    {
      path: "movieId",
      select: "title duration releaseDate poster"
    }
  ]);
  return res.status(200).json({success:true, data:showtime})
}

export const updateShowtime = async(req, res, next)=>{
  const {showtimeId} =req.params;
  const {startTime, price, totalSeats,reservedSeats, roomNumber}=req.body;
  const showtime = await Showtime.findById(showtimeId);
  if(!showtime){
    return res.status(404).json({message:"showtime not found"})
  }
  if(startTime)showtime.startTime = new Date(startTime);
    if(price)showtime.price = price;
    if(totalSeats)showtime.totalSeats = totalSeats;
    if(roomNumber)showtime.roomNumber = roomNumber;
    if(reservedSeats)showtime.reservedSeats = reservedSeats;

    await showtime.save();

   res.status(200).json({
        success: true,
        message: "Movie updated successfully",
        data:showtime
    });
}

export const getSpecifiShowtime =async(req,res,next)=>{
  const{showtimeId} = req.params;
  
  const showtime = await Showtime.findById(showtimeId).populate({
    path:"movieId",
    select:"title gener description"
  });
  if(!showtime){
    return res.status(404).json({message:"showtime not found"});
  }
  return res.status(200).json({success:true, message:showtime});
};

export const deleteShowtime = async (req,res, next) => {
  try {
    const {showtimeId} = req.params;
    const showtime = await Showtime.findById(showtimeId);
    if(!showtime){
      return res.status(404).json({message:"showtime not found"});
    }
    //delete on database
    await Showtime.findByIdAndDelete(showtimeId);
    return res.status(200).json({success:true, message:"showtime is deleted"})

  } catch (error) {
    next(error)
  }
  
};