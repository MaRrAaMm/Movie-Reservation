import { Movie } from "../../db/models/movie.model.js";
import cloudinary from "../../utils/file uploads/cloud-config.js";

//create movie
export const createMovie = async(req,res, next)=>{
    try{
        if (!req.file) {
      return res.status(400).json({ success: false, message: "poster image is required" });
    }
        const{secure_url, public_id} = await cloudinary.uploader.upload(
            req.file.path,
            {folder:`movie-reservation/movies/${req.authUser._id}`}
        );
        const movie = await Movie.create({
            title: req.body.title,
            description:req.body.description,
            genre: req.body.genre,
            createdBy: req.authUser._id,
            duration:req.body.duration,
            poster: { secure_url, public_id},
        });
        return res.status(201).json({ success: true, data: movie});
    }catch(error) {
  return next(error);
}
};

//get all movies
export const getMovies = async (req, res, next) => {
  const movies = await Movie.find({}).populate([
    { path:"createdBy", select: "userName profilePic.secure_url" },
  ]);
  return res.status(200).json({ success: true, data: movies });
};

//update movies
export const updateMovie = async(req, res, next)=>{
  try{
  const {movieId} = req.params;
  const {title, description, genre} = req.body;
  const movie = await Movie.findById(movieId);
    if (!movie){
      return res.status(404).json({message: "movie not found"});
    }

    if (req.file){
      if (movie.poster?.public_id){
        await cloudinary.uploader.destroy(movie.poster.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path,{
        folder: `movie-reservation/movies/${req.authUser._id}`,
      });

      movie.poster ={
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    }
    if(title)movie.title = title;
    if(description)movie.description = description;
    if(genre)movie.genre = genre;
    await movie.save();

     res.status(200).json({
        success: true,
        message: "Movie updated successfully",
        data:movie
    });
  }catch(error){
    next(error);
  }  

};

export const deleteMovie = async(req, res,next)=>{
  try {
    const{movieId} = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie){
      return res.status(404).json({message: "movie not found"});
    }
    if(movie.poster?.public_id){
      await cloudinary.uploader.destroy(movie.poster.public_id)
    }
    //delete movie on database
    await Movie.findByIdAndDelete(movieId);
    return res.status(200).json({success:true, message:"movie is deleted successfully"});
  } catch (error) {
    next(error)
  }
};

//get one movie
export const  getSingleMovie = async(req, res,next)=>{
  const {movieId} = req.params;
  const movie = await Movie.findById(movieId).populate({
    path:"createdBy",
    select:"userName profilePic.secure_url"
  });
   if (!movie){
      return res.status(404).json({ message:"movie not found"});
    }

    return res.status(200).json({success:true, message:movie});
  
}