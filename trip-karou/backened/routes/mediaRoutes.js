// routes/mediaRoutes.js
const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

// Define the POST route for uploading media
router.post('/upload', mediaController.upload, mediaController.uploadMedia);
router.put('/media/:media_id/update', mediaController.upload, mediaController.updateMediaWithImage);
router.put('/media/:media_id', mediaController.updateMediaDetails);
router.get('/trip/:trip_id',mediaController.getMediaByTripId);
router.delete('/trip/:trip_id',mediaController.getMediaByTripId);

module.exports = router;

