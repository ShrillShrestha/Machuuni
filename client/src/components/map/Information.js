import React from 'react';

/**
 * 
 * @param {Object} props - props object
 * @returns - Information component 
 */
const Information = (props) => {
  return (
    <div>
      <h1>{props.place.name}</h1>
      <h3>{props.place.formatted_address}</h3>
      {props.place.formatted_phone_number?<h3>Phone Number: {props.place.formatted_phone_number}</h3>:""}
      {props.place.rating? <h3>Ratings: {props.place.rating}</h3>:""}
      {props.place.website?<a href={props.place.website} target="_blank" rel="noreferrer"><button>Website</button></a>:""}
    </div>
  )
}

export default Information;