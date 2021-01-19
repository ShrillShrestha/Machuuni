import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import {CircularProgress} from '@material-ui/core';
import {getMarkerPoints, getPlaceDetails} from '../../apis/mapRequests';
import Information from './Information';

const style = {
  width: '100%',
  height: '100%'
}
/**
 * @global 
 */
let pErr = true; //sets true if wrong location is seen for the first time

/**
 * @class
 * @classdesc CurrentLocation component
 * @extends Component
 */
export class CurrentLocation extends Component {

  /**
   * Constructor for CurrentLocation instance
   * @param {Object} props - props object
   */
  /** @member {Object} marker - marker array for nearby locations */
  /** @member {number} hasMarker - status if the nearby marker are present for the given search locations */
  /** @member {Array} currentLocation - browser location when map accessed initially */
  /** @member {Array} pastLocation - user selected location */
  /** @member {boolean} isError - error status */
  /** @member {string} errorMessage - error message */
  /** @member {boolean} isLoaded - intial load status */
  /** @member {Object} markerDetails - dictionary for marker details --key: place_id, value: marker */
  /** @member {boolean} showingInfoWindow - info window status */
  /** @member {Object} activeMarker - selected marker */
  /** @member {Object} selectedPlace - selected marker details (after api call) */
  constructor(props){
    super(props);
    this.state = {
      marker: null, 
      hasMarker: 1, 
      currentLocation: [this.props.bLocation.lat, this.props.bLocation.lng], 
      pastLocation: [this.props.pos.lat, this.props.pos.lng],
      isError: this.props.bLocationErr,
      errorMessage: this.props.errMsg, 
      isLoaded: false, 
      markerDetails: {}, 
      showingInfoWindow: false, 
      activeMarker: {}, 
      selectedPlace: {},
    }
  }

  /**
   * @description Set info window for selected marker
   * @param {Object} props - props object
   * @param {Object} marker - marker object for the selected marker
   * @param {Object} e - error object
   * @function
   */
   onMarkerClick = (props, marker, e) =>{
    //check if the marker is already clicked for the given location
    if(Boolean(this.state.markerDetails[props.place_id])){
      this.setState({
        selectedPlace: {...this.state.markerDetails[props.place_id]},
        activeMarker: marker,
        showingInfoWindow: true
      });
    }else{
      getPlaceDetails(props.place_id, this.updateMarkerDict_Detail, this.setError, marker);
    }
  }
 
  /**
   * Close info window on map click
   * @param {Object} props - props object 
   * @function
   */
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  /**
   * Update marker dictonary and detail
   * @param {string} idM - place_if for the marker
   * @param {Object} markerObj - detail object for the selected marker
   * @param {Object} marker - marker object
   * @function
   */
  updateMarkerDict_Detail = (idM, markerObj, marker) => {
    let temp = {...this.state.markerDetails};
    temp[idM] = markerObj;
    this.setState({markerDetails: {...temp}, selectedPlace: {...markerObj}, activeMarker: marker, showingInfoWindow: true});
  }

  /**
   * Set marker array
   * @param {Array} arr - array of marker objects
   * @function
   */
  setMarkers = (arr) => {
    this.setState({
      marker: [...arr],
      pastLocation: [this.props.pos.lat, this.props.pos.lng],
      isLoaded: true,
      hasMarker: 1,
      isError: false,
      errorMessage: ""});
  };

  /**
   * Set error status
   * @param {boolean} isErr 
   * @param {string} message 
   * @param {*} markerCheck 
   * @function
   */
  setError = (isErr, message, markerCheck) => {
    this.setState({isError: isErr, errorMessage: message.msg, hasMarker: markerCheck});
  };
  
  /**
   * Update markers for the given location
   * @param {number} lat - Location latitude 
   * @param {number} lng - Location longtitude
   * @function
   */
  updateMarker = (lat, lng) => {
   getMarkerPoints(lat, lng, this.setMarkers, this.setError);
  };

  /**
   * Alert if the given location have no markers to show
   * @function
   */
  inMapAlert = () => {
    let mes = this.state.errorMessage + "\nUse current location or a different address!";
    alert(mes);
    this.updateMarker(this.state.currentLocation[0], this.state.currentLocation[1])
  }

  /**
   * @returns CurrentLocation component
   * @function
   */
  render(){
    let markerStatus = this.state.marker?true:false; //true if we have marker coordinates
    if(this.state.pastLocation[0] !== this.props.pos.lat && this.state.pastLocation[1] !== this.props.pos.lng){
      markerStatus = false; //set false if new place is searched
    }

    return(
      <>
        {this.state.isLoaded?
        <Map
          google={this.props.google}
          style={style}
          zoom ={12}
          initialCenter ={{
            lat: this.props.pos.lat,
            lng: this.props.pos.lng
          }}
          center={{
            lat: this.props.pos.lat,
            lng: this.props.pos.lng
          }}
          onClick={this.onMapClicked}
        > 
          {this.props.children}
          {markerStatus? this.state.marker.map((ele,n) => { //show marker
            return (<Marker
                      key ={n}
                      name={ele.name}
                      place_id = {ele.place_id}
                      position={ele.geometry.location}
                      onClick={this.onMarkerClick}
                    />)
                  }):""
                }

          {!markerStatus && parseInt(this.state.hasMarker) === 1? this.updateMarker(this.props.pos.lat, this.props.pos.lng): //search marker for a location
          parseInt(this.state.hasMarker) === 0? this.inMapAlert(): //show error if the location have no marker to show
          ""}
                  
          <InfoWindow //info window for the selected marker
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <Information place={this.state.selectedPlace}/>
          </InfoWindow>

          {this.props.isErr && pErr? alert("No such place found. Please use a correct address!") : ""} 
          {this.props.isErr? pErr = !this.props.isErr : pErr = true}

        </Map>:
          !this.state.isLoaded && this.state.isError? alert(this.state.errorMessage): //alert initial error (before initial map loading)
        <CircularProgress style={{position:'absolute', top: '50%', left:'50%'}}>{this.updateMarker(this.props.pos.lat, this.props.pos.lng)}</CircularProgress>}  
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(CurrentLocation);

/*
  Documentation for google-maps-react at: https://www.npmjs.com/package/google-maps-react
*/