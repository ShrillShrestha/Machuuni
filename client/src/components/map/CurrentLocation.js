import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import {CircularProgress} from '@material-ui/core';
import {getMarkerPoints, getPlaceDetails} from '../../apis/makerLoader';

const style = {
  width: '100%',
  height: '100%'
}

export class CurrentLocation extends Component {

  state = {
    marker: null,
    pLocation: [this.props.pos.lati, this.props.pos.long],
    zoom: 13,
    isError: false,
    errorMessage: "",
    markerDetails: {},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  onMarkerClick = (props, marker, e) =>{
    if(Boolean(this.state.markerDetails[props.place_id])){
      this.setMarkerDetails(this.state.markerDetails[props.place_id], marker);
    }else{
      getPlaceDetails(props.place_id, this.updateMarkerDict, this.setMarkerDetails, this.setError, marker);
    }
  }
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  updateMarkerDict = (idM, markerObj) => {
    let temp = {...this.state.markerDetails};
    temp[idM] = markerObj;
    this.setState({markerDetails: {...temp}});
  }

  setMarkerDetails = (mDetail, marker) => {
    this.setState({
      selectedPlace: mDetail,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  setMarkers = (arr) => {
    this.setState({marker: [...arr]});
  };

  setError = (isErr, message) => {
    this.setState({isError: isErr, errorMessage: message});
  };

  updateMarker = (lat, lng) =>{
   getMarkerPoints(lat, lng, this.setMarkers, this.setError);
  };

  render(){
    return(
      <div>
        {this.state.marker && !this.state.isError?<Map
          google={this.props.google}
          style={style}
          zoom ={this.state.zoom}
          initialCenter={{
            lat: this.state.pLocation[0],
            lng: this.state.pLocation[1]
          }}
          onClick={this.onMapClicked}
        >
          {this.state.marker.map((ele,n) => {
            return (<Marker
                      key ={n}
                      name={ele.name}
                      place_id = {ele.place_id}
                      position={ele.geometry.location}
                      onClick={this.onMarkerClick}
                    />)
                  })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <h3>{this.state.selectedPlace.formatted_address}</h3>
              {this.state.selectedPlace.formatted_phone_number?<h3>Phone Number: {this.state.selectedPlace.formatted_phone_number}</h3>:""}
              {this.state.selectedPlace.rating? <h3>Ratings: {this.state.selectedPlace.rating}</h3>:""}
              {this.state.selectedPlace.website?<a href={this.state.selectedPlace.website} target="_blank" rel="noreferrer"><button>Website</button></a>:""}
            </div>
          </InfoWindow>

        </Map>: //first ternary condition block
        this.state.isError? <div>{this.state.errorMessage}</div>: //second ternary condition block
        <CircularProgress>{this.updateMarker(this.state.pLocation[0], this.state.pLocation[1])}</CircularProgress>}  
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(CurrentLocation);