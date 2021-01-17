//importing google map api services
const {Client} = require("@googlemaps/google-maps-services-js");
const { PlacesNearbyRanking } = require("@googlemaps/google-maps-services-js/dist/places/placesnearby");

const client = new Client({});

//search nearby mental health clinic locations(coordinates)
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
        resolve(result.data.results);
      }).catch((err)=>{
        reject(err);
      })
  })
}

//get details about a location [photos, websites, ratings, formatted address, etc.]
exports.markerDetails = (placeID) => {
  return new Promise(function (resolve, reject){
    client.placeDetails({ //map api to get details on a location
      params: {
        place_id: placeID,
        fields: ['name','formatted_address', 'geometry', 'rating',
        'website', 'formatted_phone_number'],
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
  Documentation in 
    - https://googlemaps.github.io/google-maps-services-js/
    - https://developers.google.com/maps/documentation/javascript/overview
*/
