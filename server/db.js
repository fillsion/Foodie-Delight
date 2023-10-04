"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DB_URL = 'mongodb+srv://danieldigitalartsprojects:lzYBXlmoKBiJPJ1S@cluster0.7zia4i5.mongodb.net/FoodieDelights';
exports.mongooseConnection = mongoose_1.default.connect(DB_URL)
    .then(() => {
    console.log('connected to MongoDB');
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});
