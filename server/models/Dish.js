"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dishSchema = new mongoose_1.default.Schema({
    title: String,
    image: String,
    summary: String,
    instructions: String,
    liked: {
        type: Boolean,
        default: false,
    },
});
const Dish = mongoose_1.default.model('Dish', dishSchema);
exports.default = Dish;
