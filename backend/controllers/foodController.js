import Food from "../models/foodmodel.js";
import { deleteFoodImage, uploadFoodImage } from "../config/cloudinary.js";

const addFood = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }

        const uploadedImage = await uploadFoodImage(req.file.buffer);

        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: uploadedImage.secure_url,
            imagePublicId: uploadedImage.public_id,
            category: req.body.category
        });

        await food.save();
        
        console.log("Food item added:", food);

        res.json({
            success: true,
            message: "Food item added successfully",
            data: food
        });
    } catch (err) {
        console.log("Error adding food item:", err);
        res.status(500).json({
            success: false,
            message: "Failed to add food item",
            error: err.message
        });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await Food.find({});
        console.log("foods length:", foods.length);
        if(foods.length === 0){
            return res.json({ success: true, data: [] });
        }
        return res.json({ success: true, data: foods });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Failed to fetch food items",
            error: err.message
        });
    }
};

const removeFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        console.log("Request param id:", foodId);
        const food = await Food.findById(foodId);
        if (food?.imagePublicId) {
            await deleteFoodImage(food.imagePublicId);
        }

        await Food.findByIdAndDelete(foodId);
        res.json({ success: true, message: "Food item removed successfully" });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Failed to remove food item",
            error: err.message
        });
    }
};

const removeAllFoods = async (req, res) => {
    const foods = await Food.find({});
    await Food.deleteMany({});
    await Promise.all(foods
        .filter(food => food.imagePublicId)
        .map(food => deleteFoodImage(food.imagePublicId)));
    res.json({
        success: true,
        message: "All food items and their images removed successfully"
    });
};

export { addFood, listFood, removeFood, removeAllFoods };
