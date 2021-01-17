const router = require('express').Router();

const mapFunctions = require('../Controllers/mapFunction');

router.get('/details', mapFunctions.getMarkerDetails); //details on a place when marker is clicked
router.get('/', mapFunctions.getMarkerPoints); //get markers(cordinates) for nearby places

module.exports = router;