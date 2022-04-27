const addFriendBtn = document.querySelector('#add-friend');

if (addFriendBtn) {
  addFriendBtn.addEventListener('click', evt => {
    const input = document.createElement("input");
    input.type = "email";
    input.name = "friends";
    input.placeholder = "Type email...";
    document.querySelector('.emails').appendChild(input);
    document.querySelector('.emails').insertAdjacentHTML('beforeend', '<br>')
  });
}


const checkMoviesCount = () => {
  const len = document.querySelectorAll(".movie-list-item").length;
  const buttons = document.querySelectorAll(".add-movie-btn");
  console.log(`count: ${len}`)
  for (const button of buttons) {
    button.disabled = (len >= 5);
  }
}

const movieKeyword = document.querySelector('#movie-keyword');
if (movieKeyword) {
  movieKeyword.addEventListener('submit', evt => {
    evt.preventDefault();
  
    const formInput = {
      keyword: document.querySelector('#keyword').value,
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
              <input type="hidden" name="movies-added" value="${movie.id}">
              <button id="remove-movie-${movie.id}" class="remove-movie-btn" type="button">Remove movie</button>
              </li>
            `);
            // remove "Add movie to RSVP" button once movie is added to movie list
            const buttonForm = document.querySelector(`#add-movie-${movie.id}`);
            while (buttonForm.firstChild) {
              buttonForm.firstChild.remove();
            }
            checkMoviesCount();
            const removeButton = document.querySelector(`#remove-movie-${movie.id}`);
            removeButton.addEventListener('click', evt => {
              movieListItem = document.querySelector(`#movie-${movie.id}`);
              movieListItem.remove();
              // restore "Add movie to RSVP" button after movie is removed from movie list
              buttonForm.insertAdjacentHTML('beforeend', `<input type="hidden" class="movie-name" value="${movie.original_title}">
              <button type="submit" class="add-movie-btn">Add movie to RSVP</button>`)
              checkMoviesCount();
            });
  
          })
        }
      });
  });
}



const rsvpButtonYes = document.querySelector('.btn-rsvp-yes');

if (rsvpButtonYes) {
  rsvpButtonYes.addEventListener('click', evt => {
    const eventId = evt.target.value; 
    console.log(eventId);
    
    const body = {
      rsvp: true, 
    };
  
    fetch(`/api/events/${eventId}/rsvp`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(rsvpUpdate => {
        if (rsvpUpdate == 'success') {
        document.querySelector('div.ind-rsvp-status').style.display = 'none';
        document.querySelector('#rsvp-instant-update').innerHTML = 'Attending';
        rsvpButtonYes.disabled = true;
        document.querySelector('.btn-rsvp-no').disabled = true;
        }
    });
  });
}

const rsvpButtonNo = document.querySelector('.btn-rsvp-no');

if (rsvpButtonNo) {
  rsvpButtonNo.addEventListener('click', evt => {
    const eventId = evt.target.value;
    
    const body = {
      rsvp: false,
    };

    fetch(`/api/events/${eventId}/rsvp`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(rsvpUpdate => {
        if (rsvpUpdate == 'success') {
        document.querySelector('div.ind-rsvp-status').style.display = 'none';
        document.querySelector('#rsvp-instant-update').innerHTML = 'Not attending';
        rsvpButtonNo.disabled = true;
        document.querySelector('.btn-rsvp-yes').disabled = true;
        }
    });
  });
}

const voteBtns = document.querySelectorAll('.movie-votes');
console.log(`***************${voteBtns}`);
if (voteBtns) {
  for (const voteBtn of voteBtns) {
    console.log(`***${voteBtn}`);
    voteBtn.addEventListener('submit', evt => {
      evt.preventDefault();
      const apiId = evt.target.querySelector('input#vote-api-id').value;
      const eventId = event.target.querySelector('input#vote-event-id').value;
      console.log(`**${apiId}`);
      console.log(`**${eventId}`)

      const body = {
        apiId: apiId,
        eventId: eventId,
      };

      fetch('/api/vote-update', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseData => {
          console.log(document.querySelector(`#vote-${apiId}`))
          document.querySelector(`#vote-${apiId}`).innerHTML = responseData;
          document.querySelector(`#btn-${apiId}`).disabled = true;
        });
    });
  }
}


