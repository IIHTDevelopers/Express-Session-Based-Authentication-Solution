const { hotels } = require('../models/hotel');

// Get all hotels (Public route)
exports.getAllHotels = (req, res) => {
    res.status(200).json(hotels);
};

// Get hotel by ID (Public route)
exports.getHotelById = (req, res) => {
    const { id } = req.params;
    const hotel = hotels.find(h => h.id === parseInt(id));
    if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
};

// Create a hotel (Protected route)
exports.createHotel = (req, res) => {
    const { name, location, pricePerNight } = req.body;

    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const newHotel = {
        id: hotels.length + 1,
        name,
        location,
        pricePerNight,
    };
    hotels.push(newHotel);
    res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
};

// Update a hotel (Protected route)
exports.updateHotel = (req, res) => {
    const { id } = req.params;
    const { name, location, pricePerNight } = req.body;

    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const hotel = hotels.find(h => h.id === parseInt(id));
    if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
    }

    hotel.name = name || hotel.name;
    hotel.location = location || hotel.location;
    hotel.pricePerNight = pricePerNight || hotel.pricePerNight;

    res.status(200).json({ message: 'Hotel updated successfully', hotel });
};
