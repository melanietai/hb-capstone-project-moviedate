import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';


const Home = (props) => {
  const [active, setActive] = useState("login");
  const [movies, setMovies] = useState([]);
  
  const switchToLogin = () => {
    setActive("login");
  };

  const switchToSignup = () => {
    setActive("signup");
  };

  let children;
  if (active == "login") {
    children = (<Login setToken={props.setToken} switchToSignup={switchToSignup}/>)
  } else {
    children = (<Signup setToken={props.setToken} switchToLogin={switchToLogin}/>)
  }
  

  useEffect(() => {
    fetch(`/api/popularmovies`)
    .then(res => res.json())
    .then(data => {
      setMovies(data);
    });
  }, []);




  return (
    <div>
      <div>
        {children}
      </div>
      <div>
        {movies.map(movie => {
        return <img key={movie.id} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster" width="100" />
        })}
      </div>
    </div>
  )
};

export default Home;