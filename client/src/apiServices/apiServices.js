"use strict";
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
exports.removeFromFavorites = exports.fetchRecipeDetails = exports.fetchRecipesByIngredient = exports.handleLikeClick = exports.fetchRandomDishes = void 0;
const axios_1 = __importDefault(require("axios"));
const apiKey = "e01d44ef8a69456a904614af30d94e79";
function fetchRandomDishes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.get("http://localhost:4242/random-dishes");
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.fetchRandomDishes = fetchRandomDishes;
function handleLikeClick(recipe, setLikedRecipes) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.post(`http://localhost:4242/likedDishes`, recipe);
            setLikedRecipes((prevLikedRecipes) => (Object.assign(Object.assign({}, prevLikedRecipes), { [recipe.title]: !prevLikedRecipes[recipe.title] })));
        }
        catch (err) {
            console.log("Error", err);
        }
    });
}
exports.handleLikeClick = handleLikeClick;
function fetchRecipesByIngredient(ingredient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(ingredient);
            const response = yield axios_1.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`);
            return response.data;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.fetchRecipesByIngredient = fetchRecipesByIngredient;
function fetchRecipeDetails(recipeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
            const response = yield axios_1.get(apiUrl);
            return response.data;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.fetchRecipeDetails = fetchRecipeDetails;
function removeFromFavorites(dishId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.delete(`http://localhost:4242/likedDishes/${dishId}`);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.removeFromFavorites = removeFromFavorites;
