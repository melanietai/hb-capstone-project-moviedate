"""Models for movie date app."""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = "users"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    # invitations = a list of Invitation objects

    def __repr__(self):
        return f"<User user_id={self.id} email={self.email}>"


class Event(db.Model):
    """An event."""

    __tablename__ = "events"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String)
    date_and_time = db.Column(db.DateTime, nullable=False)
    movie = db.Column(db.String, nullable=False)
    key = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"<Event event_id={self.id} title={self.title} movie={self.movie}>"

    # invitations = a list of Invitation objects

class Invitation(db.Model):
    """An invitation."""

    __tablename__ = "invitations"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String, nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    event = db.relationship("Event", backref="invitations")
    user = db.relationship("User", backref="invitations")

    def __repr__(self):
        return f"<Invitation_id={self.id} email={self.email}>"


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