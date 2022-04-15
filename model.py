"""Models for movie date app.

Relationships:
A user can be many event participants.
An event can have many event participants.
An event participant wil be associated with one event and one user (
    if the event participant signed up as an user.)

"""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    # participants = a list of Participant objects

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"


class Event(db.Model):
    """An event."""

    __tablename__ = "events"

    event_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String)
    event_at = db.Column(db.DateTime, nullable=False)
    movie = db.Column(db.String, nullable=False)
    key = db.Column(db.String, nullable=False)
    
    # participants = a list of Participant objects

    def __repr__(self):
        return f"<Event event_id={self.event_id} title={self.title} movie={self.movie}>"

    

class Participant(db.Model):
    """Each event participant."""

    __tablename__ = "participants"

    participant_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("events.event_id"))
    invitee_user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    host_user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    event = db.relationship("Event", backref="participants")
    invitee_user = db.relationship("User", backref="participants")
    host_user = db.relationship("User", backref="participants")

    def __repr__(self):
        return f"<Invitation_id={self.participant_id} email={self.email}>"


def connect_to_db(flask_app, db_uri="postgresql:///moviedate", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)