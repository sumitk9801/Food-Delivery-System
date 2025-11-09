import Food from "../models/foodmodel.js";
import fs from "fs";

const addFood = async (req, res) => {
    try {
        // Check if file was uploaded
        console.log(req.data);
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded"
            });
        }

        let image_filename = req.file.filename;
        console.log("Uploaded file:", req.file);

        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image_filename,
            category: req.body.category
        });

        await food.save();
        
        console.log("Food item added:", food);

        res.json({
            success: true,
            message: "Food item added successfully",
            food
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
        res.json({ success: true, data: foods });
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
        if (food && food.image) {
            fs.unlink(`uploads/${food.image}`, () => { });
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
    foods.forEach(food => {
        if (food.image) {
            fs.promises.unlink(`uploads/${food.image}`).catch(() => { });
        }
    });
    res.json({
        success: true,
        message: "All food items and their images removed successfully"
    });
};

export { addFood, listFood, removeFood, removeAllFoods };
