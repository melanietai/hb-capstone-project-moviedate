import React, { useState, useEffect } from 'react';


const ShowMovieTitle = (props) => {
  const { apiId } = props;
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    if (apiId) {
      fetch(`/api/movie/${apiId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        setMovie(data);
      });
    }
  }, [apiId]);


  return(
    <div>
      {movie.original_title}
    </div>
  );
};


export default ShowMovieTitle;