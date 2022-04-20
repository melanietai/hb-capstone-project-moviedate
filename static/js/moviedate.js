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
        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="poster" width="100"/><br>
        Movie Title: ${movie.original_title}
        <details>
          <summary>More details:</summary>
          <p>Popularity: ${movie.popularity}</p>
          <p>Release date: ${movie.release_date}</p>
          <p>Overview: ${movie.overview}</p>
        </details>
        <button
        <br><br>
        `;
        console.log(movieInfoContent)
      document.querySelector('#movie-results').insertAdjacentHTML('afterbegin', movieInfoContent);
      }
    });
});

        // <ul class="movie-info">
        //   <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="poster" width="100"/>
        //   <a href="#" id="${movie.id}" data-json="${movie.id}">${movie.original_title} </a>
        // </ul>