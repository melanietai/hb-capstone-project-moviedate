import React, { useState, useEffect, Fragment } from 'react';


const ShowMovieDetails = (props) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const movie = props.movie;
  const voteCount = movie.vote_count;
  const apiId = movie.api_id;

  useEffect(() => {
    if (apiId) {
      fetch(`/api/movie/${apiId}`, {
        method: 'GET',
        headers: {
          // Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(movie => {
        setMovieDetails(movie);
      });
    }
  }, [apiId]);

  console.log(movieDetails);



  return(
    <Fragment>
      <img src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} alt="poster" width="100" /><br></br>
      Current Vote Counts: {voteCount}<br></br>
      Title: {movieDetails.original_title}<br></br>
      Popularity: {movieDetails.popularity}<br></br>
      Release date: {movieDetails.release_date}<br></br>
      Overview: {movieDetails.overview}<br></br>
    </Fragment>
  );
};

export default ShowMovieDetails;