import { backendURL } from './backend';

//get request to backend for getting markers coordinates for the map
export const getMarkerPoints = (lat, lng, updateMarker, updateErr) => {
  console.log("Sending req to backend to get markers...")
  fetch(`${backendURL}/map?lat=${lat}&lng=${lng}`)
  .then(async result =>{
    let ele = await result.json();
    updateMarker(ele); //reference to method that changes state(marker variable) in CurrentLocation component
  })
  .catch(err => {
    console.log(err);
    updateErr(true, err); //reference to method that set state for isError and errorMessage in CurrentLocation component
  });
};

//get request to backend for getting markers detail
export const getPlaceDetails = (placeID, updateDetailDict, updateMarkerDetail, updateErr, marker) => {
  console.log("Sending req to backend to get marker details...")
  fetch(`${backendURL}/map/details?place_id=${placeID}`)
  .then(async (result) => {
    let ele = await result.json();
    updateDetailDict(placeID, ele); //reference to method to update markerDetails dictonary
    updateMarkerDetail(ele, marker); //reference to method to update selectedMarker
  })
  .catch(err=>{
    console.log(err);
    updateErr(true, err); //reference to method that set state for isError and errorMessage in CurrentLocation component
  })
}