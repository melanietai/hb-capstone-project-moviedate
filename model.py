"""Models for The Movie Date web application.

users -> participants (one to many relationships)
participants -> events (many to one relationships)
events -> movies (one to many relationships)

"""
import os
from dataclasses import dataclass
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()

@dataclass
class User(db.Model):
    """A user."""
    user_id: int
    fname: str
    lname: str
    email: str

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    # participants = a list of Participant objects

    def __repr__(self):
        return f"<User user_id={self.user_id} name={self.fname} {self.lname} email={self.email}>"


@dataclass
class Event(db.Model):
    """An event."""
    event_id: int
    title: str
    event_at: datetime
    key: str
    
    __tablename__ = "events"

    event_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String)
    event_at = db.Column(db.DateTime, nullable=False)
    key = db.Column(db.String, nullable=False)
    
    # participants = a list of Participant objects
    # movies = a list of Movie objects

    def __repr__(self):
        return f"<Event event_id={self.event_id} title={self.title} event_at={self.event_at}>"


@dataclass
class Movie(db.Model):
    """A movie."""
    movie_id: int
    api_id: int
    vote_count: int
    event_id: int

    __tablename__ = "movies"

    movie_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    api_id = db.Column(db.Integer)
    vote_count = db.Column(db.Integer)
    event_id = db.Column(db.Integer, db.ForeignKey("events.event_id"))

    event = db.relationship("Event", backref=backref("movies", cascade="all, delete"))

    def __repr__(self):
        return f"<Movie movie_id={self.movie_id} api_id={self.api_id} vote_count={self.vote_count}>"


@dataclass
class Participant(db.Model):
    """A participant."""
    participant_id: int
    email: str  
    is_host: bool   
    RSVP: bool
    voted: bool  
    event_id: int
    user_id: int

    __tablename__ = "participants"

    participant_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, nullable=False)
    is_host = db.Column(db.Boolean, default=False)
    RSVP = db.Column(db.Boolean) #default is null = not yet replied?
    voted = db.Column(db.Boolean)
    event_id = db.Column(db.Integer, db.ForeignKey("events.event_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    event = db.relationship("Event", backref=backref("participants", cascade="all, delete"))
    user = db.relationship("User", backref="participants")

    def __repr__(self):
        return f"<Participant participant_id={self.participant_id} email={self.email}>"


def connect_to_db(flask_app, db_uri=os.environ['DATABASE_URL'], echo=False):
    if db_uri.startswith("postgres://"):     
        db_uri = db_uri.replace("postgres://", "postgresql://", 1)
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)