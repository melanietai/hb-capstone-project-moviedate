const MoviePoster = (props) => {
  // const { token } = useToken();
  const [movie, setMovie] = React.useState([]);

  const apiId = props.apiId;

  React.useEffect(() => {
    if (apiId) {
      fetch(`/api/movie/${apiId}`, {
        method: 'GET',
        headers: {
          // Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
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