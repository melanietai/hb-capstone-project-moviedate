"""CRUD operations."""

from model import db, User, Event, Participant, Movie, connect_to_db
import secrets
from sqlalchemy import update


def create_user(fname, lname, email, password):
    """Create and return a new user."""

    user = User(fname=fname, lname=lname, email=email, password=password)
    db.session.add(user)
    db.session.flush()

    # check if new user has other events that user had been invited to in the past
    # if yes, update user_id in Participant table to allow association of events
    stmt = update(Participant).where(Participant.email==email).values(user_id=user.user_id)
    db.session.execute(stmt)

    db.session.commit()

    return user


def get_users():
    """Return all users."""

    return User.query.all()


def get_user_by_id(user_id):
    """Return a user by primary key."""

    return User.query.get(user_id)


def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()


def create_event(event_at, title):
    """Create and return a new event"""

    key = secrets.token_urlsafe(8)

    return Event(title=title, event_at=event_at, key=key)


def create_participant(email, is_host, RSVP, event_id, user_id, voted):

    return Participant(email=email, is_host=is_host, RSVP=RSVP, event_id=event_id, user_id=user_id, voted=voted)

def get_participant_by_email_and_event_id(email, event_id):

    return Participant.query.filter(Participant.email == email, Participant.event_id == event_id).first()


def create_event_with_emails(user_email, event_at, title, emails):
    event = create_event(event_at=event_at, title=title)
    db.session.add(event)
    db.session.flush()
    user = get_user_by_email(user_email)
    host = create_participant(email=user_email, is_host=True, RSVP=True, event_id=event.event_id, user_id=user.user_id, voted=False)
    db.session.add(host)
    for email in emails:
        # check if email is associated with existing user account
        existing_user = get_user_by_email(email)
        if existing_user:
            user_id = existing_user.user_id
        else:
            user_id = None

        invitee = create_participant(email, is_host=False, RSVP=None, event_id=event.event_id, user_id=user_id, voted=False)
        db.session.add(invitee)
    db.session.commit()

    return event
    

def get_events_by_user_id(user_id):
    events = (
        db.session.query(Event)
        .join(Participant)
        .filter(Participant.user_id == user_id)
        .all()
    )

    return events


def get_event_by_event_id(event_id):
    return Event.query.filter(Event.event_id == event_id).first()


def get_event_by_event_key(event_key):
    return Event.query.filter(Event.key == event_key).first()

def get_event_by_email_and_key(email, key):
    event = (
        db.session.query(Event)
        .join(Participant)
        .filter(Event.key == key)
        .filter(Participant.email == email)
        .first()
    )

    return event


def create_movie(api_id, event_id, vote_count=0):

    movie = Movie(api_id=api_id, vote_count=vote_count, event_id=event_id)
    db.session.add(movie)
    db.session.commit()

    return movie


def get_movies_by_event_id(event_id):

    return Movie.query.filter(Movie.event_id == event_id).all()


def get_movie_by_event_id_and_api_id(event_id, api_id):

    return Movie.query.filter(Movie.event_id == event_id, Movie.api_id == api_id).first()

def update_vote_for_movie(movie):

    movie.vote_count += 1
    db.session.commit()

def update_voted_for_participant_id(participant_id):
    participant = Participant.query.filter(Participant.participant_id == participant_id).first()
    participant.voted = True
    db.session.commit()

if __name__ == "__main__":
    from server import app

    connect_to_db(app)
