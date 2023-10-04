"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const apiServices_1 = require("../apiServices/apiServices");
function useMyFavorites() {
    const [likedDishes, setLikedDishes] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        axios_1.default
            .get("http://localhost:4242/likedDishes")
            .then((response) => {
            setLikedDishes(response.data);
        })
            .catch((error) => {
            if (error.response && error.response.data.message) {
                console.error("Error:", error.response.data.message);
            }
            else {
                console.error("Error:", error.message);
            }
        });
    }, []);
    const handleRemoveFromFavorites = (dishId) => {
        (0, apiServices_1.removeFromFavorites)(dishId)
            .then(() => {
            setLikedDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
        })
            .catch((error) => {
            if (error.response && error.response.data.message) {
                console.error("Error:", error.response.data.message);
            }
            else {
                console.error("Error:", error.message);
            }
        });
    };
    return { likedDishes, handleRemoveFromFavorites };
}
exports.default = useMyFavorites;
