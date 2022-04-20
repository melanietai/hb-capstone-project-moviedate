document.querySelector('#movie-keyword').addEventListener('submit', evt => {
  evt.preventDefault();
  
  const formInput = {
    keyword: document.querySelector('#keyword').value
  };

  fetch('/api/search-movies', {
    method: 'POST',
    body: JSON.stringify(formInput),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(movies => {
      for (const movie of movies) {
        const movieInfoContent = `
        <ul class="movie-info">
          <li>Movie adult: ${movie.adult}</li>
          <li>Movie genre_ids: ${movie.genre_ids}</li>
          <li>Movie id: ${movie.genre_id}</li>
          <li>Movie language: ${movie.original_language}</li>
          <li>Movie title: ${movie.original_title}</li>
          <li>Movie overview: ${movie.overview}</li>
          <li>Movie popularity: ${movie.popularity}</li>
          <li>Movie release date: ${movie.release_date}</li>
          <li>Movie vote average: ${movie.vote_average}</li>
          <li><img src="https://image.tmdb.org/t/p/original${movie.poster_path}" /></li>
        </ul>
        `;
        console.log(movieInfoContent)
      document.querySelector('#movie-results').insertAdjacentHTML('afterbegin', movieInfoContent);
      }
    });
});
