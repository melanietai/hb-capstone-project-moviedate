const Events = () => {
  const { token } = useToken();
  const [events, setEvents] = React.useState([]);

  
  React.useEffect(() => {
    if (token) {
      fetch('/api/events', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json()).then(data => {
        setEvents(data);
      });
    }
  }, []);

 

  return (
    <div>
      {
        events.map(event => <EventsListItem key={event.id} event={event} />)
      }
    </div>
  );
};
