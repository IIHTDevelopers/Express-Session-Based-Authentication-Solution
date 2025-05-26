const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/hotels', hotelController.getAllHotels);
router.get('/hotels/:id', hotelController.getHotelById);

// Protected routes (session required)
router.post('/hotels', authMiddleware, hotelController.createHotel);
router.put('/hotels/:id', authMiddleware, hotelController.updateHotel);

module.exports = router;
