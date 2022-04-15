"""CRUD operations."""

from model import db, User, Event, Participant, connect_to_db
from datetime import datetime
import secrets

def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

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


def create_event(movie, user_id, date='', time='', title=''):
    """Create and return a new event"""

    key = secrets.token_urlsafe(8)

    #get user_id from session

    event = Event(title=title, date_and_time=datetime.now(), movie=movie, key=key)

    return event

def create_invitation():
    pass

def get_invitation_by_email():
    pass





if __name__ == '__main__':
    from server import app
    connect_to_db(app)