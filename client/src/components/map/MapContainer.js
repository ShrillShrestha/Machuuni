import React, {Component} from 'react';
import {CircularProgress} from '@material-ui/core';
import CurrentLocation from './CurrentLocation';
import Location from './Location';

/**
 * @class
 * @classdesc Component to host map
 * @extends Component
 */
class MapContainer extends Component{

  /**
   * Constructor for MapContainer instance
   * @param {Object} props - props object
   */
  /** @member {Object} browserLocation - current browser location */
  /** @member {boolean} isbrowserLocationError - browser location error ststus */
  /** @member {Object} position - location coordinates */
  /** @member {boolean} isError - error status */
  /** @member {string} errorMessage - error message */
  constructor(props){
    super(props);
    this.state = {
      browserLocation: null,
      isbrowserLocationError: false,
      position: null,
      isError: false,
      errorMessage: ""
    }
  }

  /**
   * Provide initial coordinate for a location (current browser location || default location)
   * @function
   */
  currentLocation = () =>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          let tempLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          //save intial browser location
          this.setState({browserLocation: {...tempLoc}
          });
          //set state for position
          this.updateLocation(tempLoc);
      }, () => { //error callback - if location permission not given
        this.handleLocationError(true)
      })
    } else{ 
      this.handleLocationError(false) //no location service available in browser
    }
  }

  /**
   * Handel location service error
   * @param {boolean} hasGeoLocation - location service status
   * @function
   */
  handleLocationError = (hasGeoLocation) => {
    if(hasGeoLocation) {
      console.log("hasGeoLocation but error!")
      this.setState({
        position: {lat: -33.856, lng: 151.215},
        browserLocation: {lat: -33.856, lng: 151.215},
        isbrowserLocationError: true,
        errorMessage: "Allow location service to locate place nearby. Using default location!",
      })
    }else{
      this.setState({
        position: {lat: -33.856, lng: 151.215},
        browserLocation: {lat: -33.856, lng: 151.215},
        isbrowserLocationError: true,
        errorMessage: "Browser doesn't provide location service. Using default location!",
      })
    }
  }

  /**
   * Relocate browser location once the map is initally loaded with initial location
   * @function
   */
  myLocation = () => {
    this.updateLocation(this.state.browserLocation);
  }

  /**
   * Set position coordinates
   * @param {Object} coords - location cordinates --e.g.{lat: Number, lng: Number}
   * @function
   */
  updateLocation = (coords) => {
    this.setState({position: {...coords}, isError: false, errorMessage: ""})
  }

  /**
   * Set error status
   * @param {boolean} errStatus - Error status
   * @param {string} message - Error message
   * @function
   */
  updateError = (errStatus, message) => {
    this.setState({isError: errStatus, errorMessage: message});
  }

  /**
   * Render components
   * @returns MapContainer component
   * @function
   */
  render() {
    return(
      <>
        {this.state.position? 
        <CurrentLocation 
          pos={this.state.position} 
          isErr= {this.state.isError}
          bLocationErr = {this.state.isbrowserLocationError}
          errMsg = {this.state.errorMessage}
          bLocation= {this.state.browserLocation}
          > 
          <Location locUpdate={this.updateLocation} errUpdate={this.updateError} currentLocation={this.myLocation}/>
        </CurrentLocation>: 
        <CircularProgress style={{position:'absolute', top: '50%', left:'50%'}}>{!this.state.browserLocation?this.currentLocation():""} </CircularProgress>}
      </>
    )
  }
}

export default MapContainer;