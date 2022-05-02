const ShowVotingForm = (props) => {
  const { participant, movies, eventKey, onVotedList } = props;
  const [apiIdList, setApiIdList] = React.useState([]);

  const apiIds = [];

  for (const movie of movies) {
    apiIds.push(movie.api_id);
  }
  console.log(apiIdList);
  const handleChange = (evt) => {
    const val = evt.target.value;
    setApiIdList((prevapiIdList) => [...prevapiIdList, val]);
  }

  const onSubmitButtonClick = (evt) => {
    evt.preventDefault();

    fetch(`/api/events/${eventKey}/vote-update`, {
      method: 'POST',
      body: JSON.stringify({ "apiIdList": apiIdList, "participant": participant }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(`response: ${data}`);
        onVotedList(data);
      });
  };


  return (
    <div>
      <div>
        <form onSubmit={onSubmitButtonClick}>
          Which movie(s) do you vote for?
          {apiIds.map(apiId => {
          return(
            <div key={apiId}>
              <input type="checkbox" name="movies" value={apiId} id={apiId} onChange={handleChange}/>
              <label htmlFor={apiId}>{<ShowMovieTitle apiId={apiId} />}</label>
            </div>
            );
          })}
          <button type="submit">Submit Votes</button>
        </form>
      </div>
    </div>
  );
};