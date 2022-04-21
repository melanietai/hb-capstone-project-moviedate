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
        <form class="add-movie">
          <input type="hidden" class="movie-name" value="${movie.original_title}">
          <button type="submit">Add movie to RSVP</button>
        </form>
        <br><br>
        `;
        console.log(movieInfoContent)
        // we should be able to do this without another query
      document.querySelector('#movie-results').insertAdjacentHTML('afterbegin', movieInfoContent);
      }
      const moviesToAdd = document.querySelectorAll('.add-movie');
        for (const movie of moviesToAdd) {
          movie.addEventListener('submit', evt => {
          evt.preventDefault();
          
          movieName = evt.target.querySelector('input').value;
          console.log(evt.target);
          document.querySelector('#movies-added').insertAdjacentHTML('beforeend', 
          `<li id=${movieName}>${movieName}</li>
          <button id="remove-buttons">Remove movie</button>
          </form>
          `);
        })
      }
      const removeButtons = document.querySelectorAll('#remove-buttons');
        for (const button of removeButtons) {
          button.addEvent.Listener('click', evt => {
            evt.preventDefault();
            evt.target.remove();
          });
        }
    });
});






