"""CRUD operations."""

from model import db, User, Event, Participant, connect_to_db
from flask import session
from datetime import datetime
import secrets


def create_user(email, password):
    """Create and return a new user."""

    return User(email=email, password=password)


def get_users():
    """Return all users."""

    return User.query.all()


def get_user_by_id(user_id):
    """Return a user by primary key."""

    return User.query.get(user_id)


def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()


def create_event(movie, event_at=datetime.now(), title=""):
    """Create and return a new event"""

    key = secrets.token_urlsafe(8)

    # get user_id from session

    return Event(title=title, event_at=event_at, movie=movie, key=key)


def create_participant(email, is_host, RSVP, event_id, user_id):

    return Participant(email=email, is_host=is_host, RSVP=RSVP, event_id=event_id, user_id=user_id)


def create_event_with_emails(movie, event_at=datetime.now(), title="", emails=[]):
    event = create_event(movie,event_at=event_at, title=title)
    user_email = session['current_user_email']
    user = get_user_by_email(user_email)
    host = create_participant(email=user_email, is_host=True, RSVP=True, event_id=event.event_id, user_id=user.user_id)
    db.session.add(host)
    for email in emails:
        # check if email is associated with existing user account
        existing_user = get_user_by_email(email)
        if existing_user:
            user_id = existing_user.user_id
        else:
            user_id = None

        invitee = create_participant(email, is_host=False, RSVP=False, event_id=event.event_id, user_id=user_id)
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


def get_event_by_email_and_key(email, key):
    event = (
        db.session.query(Event)
        .join(Participant)
        .filter(Event.key == key)
        .filter(Participant.email == email)
        .first()
    )

    return event


if __name__ == "__main__":
    from server import app

    connect_to_db(app)
