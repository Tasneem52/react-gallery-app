import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = (props) => {
  const results = props.photos;
  // I am using a conditional statment that will return the photo if results are greater than 0, else NotFound component
  let photos;
  if (results.length > 0) {
      photos = results.map((photo) => {
        return (
        <Photo
          key={photo.id}
          url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          />
        );
      })
  } else {
      photos = <NotFound />
  }

  return(
    <div className="photo-container">
      <h2>Photos of {props.query}</h2>
        <ul>
        {photos}
        </ul>
    </div>
  );
}

export default PhotoContainer;
