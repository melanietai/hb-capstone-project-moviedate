const ShowEventDetails = (props) => {
  // const Link = ReactRouterDOM.Link;
  const event = props.event;


  return(
    <div>
      <p>Event name: {event.title}</p>
      <p>Event date and time: {event.event_at}</p>
    </div>
  );
};