import React from 'react';
import PlacesAutocomplete, {getLatLng,geocodeByAddress} from 'react-places-autocomplete';

/**
 * Search location component
 * @param {Object} props - props object
 * @returns - location options
 */
const Location = (props) => {
  const [address, setAddress] = React.useState("");

  /**
   * Set Coordinates
   * @param {string} value - location name 
   */
  const handleSelect = async (value) => {
    try{
      const results = await geocodeByAddress(value); //results for a selected location
      const latLng = await getLatLng(results[0]); //coordinates for the top option
      setAddress(value);
      props.locUpdate(latLng);
    }catch(err){
      props.errUpdate(true, "Something went wrong searching the place!");
    }
  };

  return(
    <> 
      <div style={
        {
          position: 'absolute',
          top: '3.5px',
          left: '45%',
        }
      }
      >
        <span>Mental Health Clinics Nearby</span>
      </div>
      <div style={
        {
          position: 'absolute',
          top: '57px',
          left: '10px',
        }
      }>
        <button onClick={props.currentLocation}> 
          Current Location
        </button>
      </div>

      <div style={
        {
          position: 'absolute',
          top: '85px',
          left: '10px',
        }
      }>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => ( //provide autocomplete feature
            <div
            style={{
                backgroundColor:'#D3D3D3',
                paddingLeft:'3px',
                borderRadius: '5px'
              }}>
              <span >Search Location: </span>
              <input {...getInputProps({ placeholder: "Press Enter or Select an option to submit", size:"35" })} /> 

              <div>
                {loading ? <div>...loading</div> : null}
                {suggestions.map((suggestion,ind) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })} key={ind}>
                        {suggestion.description}
                      </div>
                    );
                  })
                }
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    </>
  )
}

export default Location;

/*
  Documentation for react-place-autocomplete at: https://www.npmjs.com/package/react-places-autocomplete
*/