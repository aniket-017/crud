const express = require('express');
const { getAllVenues, createVenue, deleteVenue, updateVenue } = require('../controllers/venueController');


const router = express.Router();

router.route('/venues').get(getAllVenues);
router.route('/venue/new').post(createVenue);
router.route('/venue/:id').delete(deleteVenue);
router.route('/venue/:id').put(updateVenue);


module.exports = router;
