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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const apiServices_1 = require("../apiServices/apiServices");
function useRandomDish() {
    const [randomRecipe, setRandomRecipe] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const generateNewKey = () => {
        const newKey = Math.random() * 0.001;
        return newKey;
    };
    (0, react_1.useEffect)(() => {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                const newKey = generateNewKey();
                console.log(newKey);
                try {
                    const data = yield (0, apiServices_1.fetchRandomDishes)();
                    setRandomRecipe(data);
                    setIsLoading(false);
                }
                catch (error) {
                    setIsLoading(false);
                }
            });
        }
        fetchData();
    }, []);
    return { randomRecipe, isLoading };
}
exports.default = useRandomDish;
