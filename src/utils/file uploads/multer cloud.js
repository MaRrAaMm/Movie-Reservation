import multer, { diskStorage } from "multer";
export const fileValidation= {
    images:["image/jpeg","image/png","image/webp"],
    files:["application/pdf","application/msword"]
};

export const cloudUpload = (allowedTypes,folder)=>{
    try {
        const storage = diskStorage({});
        //fileFilter layer
        const fileFilter = (req, file, cb) =>{
            if(!allowedTypes.includes(file.mimetype)){
             return cb(new Error("invlaid file formate"), false);
            }
            return cb(null, true);
    
        };
        return multer({storage, fileFilter});
        
    } catch (error) {
        console.log(error.message);
        
        
    }
}
