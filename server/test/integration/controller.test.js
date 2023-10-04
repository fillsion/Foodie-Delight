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
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("../../router"));
const supertest_1 = __importDefault(require("supertest"));
const Dish_1 = __importDefault(require("../../models/Dish"));
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = "mongodb://127.0.0.1:27017";
const databaseName = 'test';
describe('integration tests', () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(router_1.default);
    const request = (0, supertest_1.default)(app);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const url = `${dbConnection}/${databaseName}`;
        yield mongoose_1.default.connect(url)
            .then(() => {
            console.log('connected to MongoDB');
        })
            .catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
        });
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Dish_1.default.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it('it should save a liked dish to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const dishData = {
            title: 'Test Dish',
            image: 'test-image-url',
            summary: 'Test summary',
            instructions: 'Test instructions',
            liked: false
        };
        const response = yield request
            .post('/likedDishes')
            .send(dishData)
            .expect(200);
        expect(response.body).toHaveProperty('message', 'Dish liked and saved successfully');
        const savedDish = yield Dish_1.default.findOne({ title: 'Test Dish' });
        expect(savedDish).toBeTruthy();
    }));
    it('it should get all liked dishes', () => __awaiter(void 0, void 0, void 0, function* () {
        const likedDishes = [
            {
                title: 'Test Dish',
                image: 'test-image-url',
                summary: 'Test summary',
                instructions: 'Test instructions',
                liked: true
            },
            {
                title: 'Test Dish2',
                image: 'test-image-url2',
                summary: 'Test summary2',
                instructions: 'Test instructions2',
                liked: true
            },
        ];
        yield Dish_1.default.insertMany(likedDishes);
        const response = yield request.get(`/likedDishes`).expect(200);
        expect(response.body.length).toBe(likedDishes.length);
    }));
    it('should delete an existing liked dish', () => __awaiter(void 0, void 0, void 0, function* () {
        const likedDish = new Dish_1.default({
            title: 'Test Dish',
            image: 'test-image-url',
            summary: 'Test summary',
            instructions: 'Test instructions',
            liked: true,
        });
        const savedDish = yield likedDish.save();
        const response = yield request.delete(`/likedDishes/${savedDish._id}`).expect(200);
        expect(response.body.message).toBe('Dish deleted successfully');
        const deletedDish = yield Dish_1.default.findById(likedDish._id);
        expect(deletedDish).toBeNull();
    }));
    it('should return an error when trying to delete a non-existent liked dish', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentDishId = new mongoose_1.default.Types.ObjectId();
        const response = yield request.delete(`/likedDishes/${nonExistentDishId}`).expect(404);
        expect(response.body).toHaveProperty('message', 'Dish not found');
    }));
    it('should get three random dishes', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/random-dishes').expect(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(3);
        response.body.forEach((dish) => {
            expect(dish).toHaveProperty('title');
            expect(dish).toHaveProperty('image');
            expect(dish).toHaveProperty('summary');
            expect(dish).toHaveProperty('instructions');
            expect(dish).toHaveProperty('liked', false); // Random dishes should not be liked
        });
    }));
    it('should return an error when trying to save an already liked dish', () => __awaiter(void 0, void 0, void 0, function* () {
        const likedDishData = {
            title: 'Test Dish',
            image: 'test-image-url',
            summary: 'Test summary',
            instructions: 'Test instructions',
            liked: true,
        };
        yield Dish_1.default.create(likedDishData);
        const response = yield request
            .post('/likedDishes')
            .send(likedDishData)
            .expect(400);
        expect(response.body).toHaveProperty('message', 'Dish already liked');
    }));
    it('should return an error when trying to save a dish with missing data', () => __awaiter(void 0, void 0, void 0, function* () {
        const dishData = {
            image: 'test-image-url',
            summary: 'Test summary',
            instructions: 'Test instructions',
            liked: true,
        };
        const response = yield request
            .post('/likedDishes')
            .send(dishData)
            .expect(400);
        expect(response.body).toHaveProperty('message', 'Validation error');
    }));
    it('should handle no liked dishes found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/likedDishes').expect(404);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'No liked dishes found');
    }));
});
