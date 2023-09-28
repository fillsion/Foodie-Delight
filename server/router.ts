'use strict';

import { Router } from 'express';
import dish from './controllers/dishController';

const router: Router = Router();

router.get('/random-dishes', dish.getThreeRandomDishes);
router.post('/likedDishes', dish.saveLikedDish);
router.get('/likedDishes', dish.getLikedDishes);
router.delete('/likedDishes/:dishId', dish.deleteLikedDish);

export default router;
