const Points = require('../Utils/markerPoint');

//get marker coordinates
exports.getMarkerPoints = (req, res, next) => {
  Points.markerPoints(req.query.lat, req.query.lng)
  .then(result =>{
    console.log("Request successful:", result.length, "results found!");
    if(result.length == 0){
      throw new Error("No places found nearby!");
    }
    res.status(200).json(result); //send result to frontend
  })
  .catch(err => {
    console.log("Request failed to get markers:", err);
    res.status(500).json(err); //send result to frontend
  })
}

// get details on the selected location
exports.getMarkerDetails = (req, res, next) => {
  Points.markerDetails(req.query.place_id)
  .then(result => {
    console.log("Getting details...");
    if(Object.keys(result).length === 0){
      throw new Error("No information about the given location!");
    }
    res.status(200).json(result)
  }).catch(err => {
    console.log("Request failed to get details: ", err);
    res.status(500).json(err);
  })
}