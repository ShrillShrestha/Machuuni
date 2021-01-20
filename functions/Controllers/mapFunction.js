const Points = require('../Utils/markerPoint');

/**
 * Get marker coordinates
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getMarkerPoints = (req, res) => {
  Points.markerPoints(req.query.lat, req.query.lng)
  .then(result =>{
    console.log("Request successful:", result.length, "results found!");
    if(result.length == 0){
      throw new Error('No mental health clinic found near by!');
    }
    res.status(200).json(result);
  })
  .catch(err => {
    console.log("Request failed to get markers:", err);
    res.status(500).json(err); 
  })
}

/**
 * Get details on the selected location
 * @param {Object} req - request object 
 * @param {Object} res - response object
 */
exports.getMarkerDetails = (req, res) => {
  Points.markerDetails(req.query.place_id)
  .then(result => {
    console.log("Recieving details...");
    if(Object.keys(result).length === 0){
      throw new Error("No information about the given location!");
    }
    res.status(200).json(result)
  }).catch(err => {
    console.log("Request failed to get details: ", err);
    res.status(500).json(err);
  })
}