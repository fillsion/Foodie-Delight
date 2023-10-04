'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = 4242;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', router_1.default);
db_1.mongooseConnection
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});
