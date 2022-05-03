import React, { useState, useEffect } from 'react';


const MoviePoster = (props) => {
  // const { token } = useToken();
  const [movie, setMovie] = useState([]);

  const apiId = props.apiId;

  useEffect(() => {
    if (apiId) {
      fetch(`/api/movie/${apiId}`, {
        method: 'GET',
        headers: {
          // Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        console.log(`response: ${data}`);
        setMovie(data);
      });
    }
  }, [apiId]);


  return(
    <div>
      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster" width="100" />
    </div>
  );
};

export default MoviePoster;