'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLikedDish = exports.getLikedDishes = exports.saveLikedDish = exports.getThreeRandomDishes = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const Dish_1 = __importDefault(require("../models/Dish"));
const apiKey = 'e01d44ef8a69456a904614af30d94e79';
const getThreeRandomDishes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const numberOfRecipes = 3;
        const recipePromises = [];
        for (let i = 0; i < numberOfRecipes; i++) {
            recipePromises.push(axios_1.default.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`));
        }
        const responses = yield Promise.all(recipePromises);
        const randomDishes = [];
        responses.forEach((response) => {
            const randomRecipe = response.data.recipes[0];
            const { title, image, summary, instructions } = randomRecipe;
            const $ = cheerio.load(summary);
            const plainTextSummary = $.text();
            const ins = cheerio.load(instructions);
            const plainTextInstructions = ins.text();
            randomDishes.push({
                title,
                image,
                summary: plainTextSummary,
                instructions: plainTextInstructions,
                liked: false
            });
        });
        console.log(randomDishes);
        res.status(200).json(randomDishes);
    }
    catch (err) {
        console.log('Error', err);
        res.status(500).send('Internal Server Error');
    }
});
exports.getThreeRandomDishes = getThreeRandomDishes;
const saveLikedDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dishData = req.body;
        //TODO missing attribute validation for incomplete dish data.
        const requiredFields = ['title', 'image', 'summary', 'instructions'];
        if (!requiredFields.every(field => dishData[field])) {
            return res.status(400).json({ message: 'Validation error' });
        }
        const existingDish = yield Dish_1.default.findOne(dishData);
        if (existingDish) {
            return res.status(400).json({ message: 'Dish already liked' });
        }
        const newDish = new Dish_1.default(Object.assign(Object.assign({}, dishData), { liked: true }));
        yield newDish.save();
        res.status(200).json({ message: 'Dish liked and saved successfully' });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});
exports.saveLikedDish = saveLikedDish;
const getLikedDishes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likedDishes = yield Dish_1.default.find({ liked: true });
        if (likedDishes.length === 0) {
            return res.status(404).json({ message: 'No liked dishes found' });
        }
        res.status(200).json(likedDishes);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});
exports.getLikedDishes = getLikedDishes;
const deleteLikedDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dishId = req.params.dishId;
        const deletedDish = yield Dish_1.default.findByIdAndRemove(dishId);
        if (!deletedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.status(200).json({ message: 'Dish deleted successfully' });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Not able to delete the dish');
    }
});
exports.deleteLikedDish = deleteLikedDish;
