import { backendURL } from './backend';

/**
 * Api call to server for getting markers
 * @param {number} lat - Location latitude
 * @param {number} lng - Location longtitude
 * @param {function} updateMarker - function reference to set state for marker
 * @param {function} updateErr - functon reference to set state for error
 * @function
 */
export const getMarkerPoints = (lat, lng, updateMarker, updateErr) => {
  let noMarker = 1;
  let isConnected = false; //check if it is connection error
  console.log("Sending req to backend to get markers...");
  fetch(`${backendURL}/map?lat=${lat}&lng=${lng}`)
  .then(async result =>{
    isConnected = true;
    let ele = await result.json();
    if(result.ok){
      updateMarker(ele); //set state for marker variable in CurrentLocation component
    }else{
      throw new Error();
    }
  })
  .catch(err => {
    if(Object.keys(err).length === 0 && isConnected){
      noMarker = 0 //set 0 if there is no marker for the given location
      err["msg"] = "No mental health clinic found near by!\nOr Something went wrong with the connection!"
    }else{
      err["msg"] = "Something went wrong getting locations!"
    }
    updateErr(true, err, noMarker); //set state for isError and errorMessage in CurrentLocation component
  });
};

/**
 * Api call to server for getting details on selected marker
 * @param {string} placeID - unique id for location
 * @param {function} updateDetailDict - function reference to set state for markerDetails and selected place
 * @param {function} updateErr - functon reference to set state for error
 * @param {Object} marker - marker object 
 * @function
 */
export const getPlaceDetails = (placeID, updateDetailDict, updateErr, marker) => {
  console.log("Sending req to backend to get marker details...");
  fetch(`${backendURL}/map/details?place_id=${placeID}`)
  .then(async (result) => {
    if(result.ok){
      let ele = await result.json();
      updateDetailDict(placeID, ele, marker); //update markerDetails dictonary
    }else{
      throw new Error();
    }
  })
  .catch(err=>{
    err["msg"] = "Something went wrong with details!"
    console.log(err);
    updateErr(true, err, 1); //reference to method that set state for isError and errorMessage in CurrentLocation component
  })
}
