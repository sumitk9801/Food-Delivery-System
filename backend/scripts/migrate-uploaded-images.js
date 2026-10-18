import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import Food from "../models/foodmodel.js";
import { uploadFoodImage } from "../config/cloudinary.js";

const uploadsDirectory = path.resolve("uploads");

const imageBaseName = (image) => path.basename(image).replace(/^[0-9]+-/, "").toLowerCase();
const normalizedLabel = (value) => value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
const fileBaseName = (file) => normalizedLabel(path.basename(file, path.extname(file)).replace(/^[0-9]+-/, ""));

const metadataByBaseName = {
    dosa: { name: "Dosa", price: 8, category: "Pure Veg" },
    "belgium_pastry": { name: "Belgium Pastry", price: 6, category: "Deserts" },
    "chili_pasta": { name: "Chili Pasta", price: 10, category: "Pasta" },
    "chocolatecake": { name: "Chocolate Cake", price: 8, category: "Cake" },
    "high_protein_salad": { name: "High Protein Salad", price: 12, category: "Salad" }
};

try {
    await mongoose.connect(process.env.MONGO_URI);

    const files = (await fs.readdir(uploadsDirectory))
        .filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file));
    const foods = await Food.find({});
    const foodsByFilename = new Map(foods.map((food) => [food.image, food]));
    const foodsByBaseName = new Map(foods.map((food) => [imageBaseName(food.image), food]));
    const foodsByName = new Map(foods.map((food) => [normalizedLabel(food.name), food]));

    let migrated = 0;
    let skipped = 0;
    let unmatched = 0;

    for (const file of files) {
        const food = foodsByFilename.get(file)
            || foodsByBaseName.get(imageBaseName(file))
            || foodsByName.get(fileBaseName(file));

        if (!food) {
            const metadata = metadataByBaseName[fileBaseName(file)];
            if (!metadata) {
                console.log(`UNMATCHED ${file}`);
                unmatched += 1;
                continue;
            }

            const buffer = await fs.readFile(path.join(uploadsDirectory, file));
            const uploadedImage = await uploadFoodImage(buffer);
            await Food.create({
                ...metadata,
                description: "Freshly prepared and served with care.",
                image: uploadedImage.secure_url,
                imagePublicId: uploadedImage.public_id
            });

            console.log(`CREATED AND MIGRATED ${file}`);
            migrated += 1;
            continue;
        }

        if (food.imagePublicId && /^https?:\/\//i.test(food.image)) {
            console.log(`SKIPPED ${file} (already migrated)`);
            skipped += 1;
            continue;
        }

        const buffer = await fs.readFile(path.join(uploadsDirectory, file));
        const uploadedImage = await uploadFoodImage(buffer);

        food.image = uploadedImage.secure_url;
        food.imagePublicId = uploadedImage.public_id;
        await food.save();

        console.log(`MIGRATED ${file}`);
        migrated += 1;
    }

    console.log(`Migration complete: ${migrated} migrated, ${skipped} skipped, ${unmatched} unmatched.`);
} finally {
    await mongoose.disconnect().catch(() => {});
}