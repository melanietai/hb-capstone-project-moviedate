"""CRUD operations."""

from model import db, User, Event, Invitation, connect_to_db
from datetime import datetime
import secrets

def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    return user


def create_event(movie, user_id, date="", time="", title=""):
    """Create and return a new event"""

    key = secrets.token_urlsafe(8)

    #get user_id from session

    event = Event(title=title, date_and_time=datetime.now(), movie=movie, key=key)

    return event



if __name__ == '__main__':
    from server import app
    connect_to_db(app)