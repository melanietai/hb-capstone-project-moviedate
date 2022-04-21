const checkMoviesCount = () => {
  const len = document.querySelectorAll(".movie-list-item").length;
  const buttons = document.querySelectorAll(".add-movie-btn");
  console.log(`count: ${len}`)
  for (const button of buttons) {
    button.disabled = (len >= 5);
  }
}

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
        <details id=${movie.id}>
          <summary>More details:</summary>
          <p>Popularity: ${movie.popularity}</p>
          <p>Release date: ${movie.release_date}</p>
          <p>Overview: ${movie.overview}</p>
        </details>
        <form id="add-movie-${movie.id}">
          <input type="hidden" class="movie-name" value="${movie.original_title}">
          <button type="submit" class="add-movie-btn">Add movie to RSVP</button>
        </form>
        <br><br>
        `;
        // we should be able to do this without another query
        document.querySelector('#movie-results').insertAdjacentHTML('afterbegin', movieInfoContent);
        const addMovieForm = document.querySelector(`#add-movie-${movie.id}`);
        addMovieForm.addEventListener('submit', evt => {
          evt.preventDefault();

          movieName = evt.target.querySelector('input').value;
          document.querySelector('#movies-added').insertAdjacentHTML('beforeend',
            `<li class="movie-list-item" id="movie-${movie.id}">
            ${movieName}
            <button id="remove-movie-${movie.id}" class="remove-movie-btn" type="button">Remove movie</button>
            </li>
          `);
          checkMoviesCount();
          const removeButton = document.querySelector(`#remove-movie-${movie.id}`);
          removeButton.addEventListener('click', evt => {
            evt.preventDefault();
            movieListItem = document.querySelector(`#movie-${movie.id}`);
            movieListItem.remove();
            checkMoviesCount();
          });

        })
      }
    });
});






