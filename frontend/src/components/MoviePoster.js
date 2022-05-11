import React, { useState, useEffect } from 'react';
import {
  Image,
  AspectRatio
} from "@chakra-ui/react";


const MoviePoster = (props) => {
  const [movie, setMovie] = useState([]);

  const apiId = props.apiId;

  useEffect(() => {
    if (apiId) {
      fetch(`/api/movie/${apiId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        console.log(`response: ${data}`);
        setMovie(data);
      });
    }
  }, [apiId]);


  return(
    <>
      <AspectRatio ratio={1/1}>
        <Image
          position="relative"
          w="50%"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="poster"
        />
      </AspectRatio>
     
    </>
  );
};


export default MoviePoster;