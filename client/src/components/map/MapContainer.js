import React from 'react';
import CurrentLocation from './CurrentLocation';
import {CircularProgress} from '@material-ui/core'

//MapContainer component layout
class MapContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      postion: null, //postion variable (object) -- e.g. {lati: Number, long: Number} 
    }
  }

  //Gets the users current browserlocation
  updateLocation = () =>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          //set state for position
          this.setState({postion: {
            lati: position.coords.latitude,
            long: position.coords.longitude
          }
        });
      })
    } 
  }

  //load CurrentLocation component once the current location is set
  render() {
    return(
      <div>
        {this.state.postion? <CurrentLocation pos={this.state.postion}/>: 
        <CircularProgress>{this.updateLocation()} </CircularProgress>}
      </div>
    )
  }
}

export default MapContainer;