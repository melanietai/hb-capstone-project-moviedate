from server import app
from unittest import TestCase
import unittest
from model import connect_to_db, db, User, Participant, Event, Movie
import crud
from datetime import datetime

class MyAppCrudTestCase(TestCase):
    """Testing crud functions."""

    def setUp(self):
        """Setup before every test."""

        # Connect to test database
        connect_to_db(app, "postgresql:///testdb")

        # Create tables
        db.create_all()

    def tearDown(self):
        """Teardown after each test."""
        db.session.commit()
        db.drop_all()

    def test_create_user(self):
        """Test create and return a user crud function."""

        user = crud.create_user(fname="John", lname="Li", email="jli@example.com", password="john")
        self.assertEqual("John", user.fname)
        self.assertEqual("Li", user.lname)
        self.assertEqual("jli@example.com", user.email)
        self.assertEqual("john", user.password)

    def test_get_users(self):
        """Test get all users crud function."""

        # Add sample data
        rachel = User(
            fname="Rachel", lname="Smith", email="rsmith@example.com", password="rachel"
        )
        john = User(
            fname="John", lname="Li", email="jli@example.com", password="john"
        )
        db.session.add_all([rachel, john])
        db.session.commit()

        self.assertEqual([rachel, john], crud.get_users())
    
    def test_get_user_by_id(self):
        """Test get user by user id crud function."""

        # Add sample data
        rachel = User(
            fname="Rachel", lname="Smith", email="rsmith@example.com", password="rachel"
        )
        db.session.add(rachel)
        db.session.commit()

        self.assertEqual(rachel, crud.get_user_by_id(user_id=rachel.user_id))

    def test_get_user_by_email(self):
        """Test get user by email crud function."""

        # Add sample data
        rachel = User(
            fname="Rachel", lname="Smith", email="rsmith@example.com", password="rachel"
        )
        db.session.add(rachel)
        db.session.commit()

        self.assertEqual(rachel, crud.get_user_by_email(email=rachel.email))
    
    def test_create_event(self):
        """Test create and return an event."""

        event = crud.create_event(event_at=datetime.now(), title="testing")
        self.assertEqual("testing", event.title)
    
    def test_create_participant(self):
        """Test create and return a participant."""

        participant = crud.create_participant(email="rsmith@example.com", is_host=False, RSVP=False, event_id=1, user_id=None, voted=False)
        self.assertEqual("rsmith@example.com", participant.email)

    def test_get_participant_by_email_and_event_id(self):
        """Test return a participant by email and event id."""

        # Add sample data
        participant = Participant(email="rsmith@example.com", is_host=False, RSVP=False, voted=False, event_id=1, user_id=None)
        event = Event(title="testing", event_at=datetime.now(), key="abc")

        db.session.add_all([participant, event])
        db.session.commit()

        self.assertEqual(participant, crud.get_participant_by_email_and_event_id(email="rsmith@example.com", event_id=event.event_id))

    def test_create_event_with_emails(self):
        """Test create and return an event."""

        # Add sample data
        rachel = User(
            fname="Rachel", lname="Smith", email="rsmith@example.com", password="rachel"
        )
        db.session.add(rachel)
        db.session.commit()
        event = crud.create_event_with_emails(user_email=rachel.email, event_at=datetime.now(), title="testing", emails=["jli@example.com"])
        
        check_event = Event.query.filter(Event.title == event.title).first()

        self.assertEqual(event, check_event)

    def test_get_events_by_user_id(self):
        """Test return all events by user id."""

        # Add sample data
        rachel = User(
            fname="Rachel", lname="Smith", email="rsmith@example.com", password="rachel"
        )
        participant = Participant(email="rsmith@example.com", is_host=False, RSVP=False, voted=False, event_id=1, user_id=1)
        event = Event(title="testing", event_at=datetime.now(), key="abc")
        movie = Movie(api_id=20, vote_count=0, event_id=1)
        db.session.add_all([rachel, participant, event, movie])
        db.session.commit()

        self.assertEqual([event], crud.get_events_by_user_id(user_id=rachel.user_id))


if __name__ == "__main__":
    unittest.main()
