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
const react_router_dom_1 = require("react-router-dom");
function useSearch() {
    const [recipes, setRecipes] = (0, react_1.useState)([]);
    const { ingredient } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!ingredient)
                        return;
                    const data = yield (0, apiServices_1.fetchRecipesByIngredient)(ingredient);
                    console.log("fetch recepies", data);
                    setRecipes(data);
                }
                catch (err) {
                    console.log(err);
                }
            });
        }
        fetchData();
    }, [ingredient]);
    return { recipes, ingredient };
}
exports.default = useSearch;
