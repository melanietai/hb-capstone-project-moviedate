import { Link } from 'react-router-dom';


const EventsListItemDetails = (props) => {
  const event = props.event;

  return(
    <div>
      <p>Event name: <Link to={`/events/${event.key}`}>{event.title}</Link></p>
      <p>Event date and time: {event.event_at}</p>
    </div>
  );
};

export default EventsListItemDetails;