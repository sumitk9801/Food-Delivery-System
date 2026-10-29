import express from 'express';
import { addFood,listFood,removeFood,removeAllFoods } from '../controllers/foodController.js';
import auth from '../middleware/auth.js';
import multer from 'multer';

const foodRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only image files are allowed"));
    }
});

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.delete("/remove/:id",removeFood);
foodRouter.post("/removeALL",removeAllFoods);


export default foodRouter;