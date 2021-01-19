//google map api service
const {Client} = require("@googlemaps/google-maps-services-js");
const { PlacesNearbyRanking } = require("@googlemaps/google-maps-services-js/dist/places/placesnearby");

const client = new Client({}); //google client object

/**
 * Get marker locations for the nearby places
 * @param {number} lat - latitude of the user/selected location
 * @param {number} lng  - longtitude of the user/selected location
 * @returns {Promise} - promise object represents nearby places marker list
 */

exports.markerPoints = (lat, lng) => {
  return new Promise(function (resolve, reject) { 
      client.placesNearby({  //google maps api places near by feature
      params:{
        keyword: "mental health",
        type: "health",
        rankby:PlacesNearbyRanking.distance,
        location:[parseFloat(lat), parseFloat(lng)],
        key: process.env.MAP_API_KEY,
      },
      timeout: 1000,
      }).then((result)=>{
        resolve(result.data.results); //nearby places markers
      }).catch((err)=>{
        reject(err);
      })
  })
}

/**
 * Get detail[selected] information on a location
 * @param {string} placeID - unique place id for a location
 * @returns {Promise} - detail information on  a location [photos, websites, ratings, formatted address, etc.]
 */
exports.markerDetails = (placeID) => {
  return new Promise(function (resolve, reject){
    client.placeDetails({ 
      params: {
        place_id: placeID,
        fields: ['name','formatted_address', 'geometry', 'rating',
        'website', 'formatted_phone_number'], //fields to retrive info on a location
        key: process.env.MAP_API_KEY,
      },
      timeout: 1000,
    }).then((results)=>{
      resolve(results.data.result);
    }).catch((err)=>{
      reject(err);
    })
  })
}

/*
  API Documentation: 
    - https://googlemaps.github.io/google-maps-services-js/
    - https://developers.google.com/maps/documentation/javascript/overview
*/
