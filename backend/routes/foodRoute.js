import express from 'express';
import { addFood,listFood,removeFood,removeAllFoods } from '../controllers/foodController.js';
import auth from '../middleware/auth.js';
import multer from 'multer';

const foodRouter = express.Router();

//Image Storage method
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({storage:storage});

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.delete("/remove/:id",removeFood);
foodRouter.post("/removeALL",removeAllFoods);


export default foodRouter;