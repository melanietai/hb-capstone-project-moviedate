const ShowMovieTitle = (props) => {
  const { apiId } = props;
  const [movie, setMovie] = React.useState([]);

  React.useEffect(() => {
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

  console.log('hello');


  return(
    <div>
      {movie.original_title}
    </div>
  );


};