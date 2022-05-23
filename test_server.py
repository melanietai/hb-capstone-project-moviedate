from server import app
from unittest import TestCase
import unittest
from model import connect_to_db, db, User, Event, Movie, Participant
from datetime import datetime


class MyAppIntegrationTestCase(TestCase):
    """Testing Flask server."""

    def setUp(self):
        """Setup before every test."""

        # Get the Flask test client
        self.client = app.test_client()
        app.config["TESTING"] = True

        # Connect to test database
        connect_to_db(app, "postgresql:///testdb")

        # Create tables
        db.create_all()

    def tearDown(self):
        """Teardown after each test."""
        db.session.commit()
        db.drop_all()

    def test_create_token(self):
        """Test user login."""

        # Add sample data
        rachel = User(
            fname="Rachel", lname="Smith", email="rsmith@example.com", password="rachel"
        )
        db.session.add(rachel)
        db.session.commit()

        result = self.client.post(
            "/api/token", json={"email": "rsmith@example.com", "password": "rachel"}
        )
        token = result.get_json().get("access_token")

        self.assertEqual(200, result.status_code)
        self.assertEqual(str, type(token))
        self.assertNotEqual(0, len(token))

    def test_user_register(self):
        """Test new user registration."""

        result = self.client.post(
            "/api/user",
            json={
                "fname": "Rachel",
                "lname": "Smith",
                "email": "rsmith@example.com",
                "password": "rachel",
            },
        )
        token = result.get_json().get("access_token")

        self.assertEqual(200, result.status_code)
        self.assertEqual(str, type(token))
        self.assertNotEqual(0, len(token))

    def test_show_event(self):
        """Test show an event."""

        # Add sample data
        event = Event(
            title="testing", event_at=datetime.now(), key="test"
        )

        db.session.add(event)
        db.session.commit()

        result = self.client.get(f"/api/events/{event.key}")
        data = result.get_json() 

        self.assertEqual(200, result.status_code)
        self.assertEqual(event.event_id, data['event']['event_id'])
        self.assertEqual(event.title, data['event']['title'])
        self.assertEqual(event.key, data['event']['key'])
        self.assertEqual(event.event_at.strftime('%a, %d %b %Y %H:%M:%S GMT'), data['event']['event_at'])

    def test_show_movies(self):
        """Test show all movies from an event."""

        # Add sample data
        event = Event(
            title="testing", event_at=datetime.now(), key="test"
        )

        movie = Movie(
            api_id=321, vote_count=0, event_id=1
        )

        db.session.add_all([event, movie])
        db.session.commit()

        result = self.client.get(f"/api/movies/{event.event_id}")
        data = result.get_json()

        self.assertEqual(200, result.status_code)
        self.assertEqual(movie.movie_id, data[0]['movie_id'])
        self.assertEqual(movie.api_id, data[0]['api_id'])
        self.assertEqual(movie.vote_count, data[0]['vote_count'])
        self.assertEqual(movie.event_id, data[0]['event_id'])

    def test_update_rsvp(self):
        """Test update rsvp response."""

        # Add sample data
        event = Event(
            title="testing", event_at=datetime.now(), key="test"
        )
        participant = Participant(
            email="abc@example.com", is_host=False, RSVP=False, voted=False, event_id=1, user_id=None
        )

        db.session.add_all([event, participant])
        db.session.commit()

        result = self.client.put(
            f"/api/events/{event.key}/rsvp",
            json={
                "rsvp": True,
                "email": "abc@example.com",
            },
        )
        data = result.get_json()

        self.assertEqual(200, result.status_code)
        self.assertEqual(True, data['RSVP'])

    def test_update_vote(self):
        """Test update vote count for a movie."""

        # Add sample data
        event = Event(
            title="testing", event_at=datetime.now(), key="test"
        )
        movie = Movie(
            api_id=321, vote_count=0, event_id=1
        )
        participant = Participant(
            email="abc@example.com", is_host=False, RSVP=False, voted=False, event_id=1, user_id=None
        )

        db.session.add_all([event, movie, participant])
        db.session.commit()

        result = self.client.put(
            f"/api/events/{event.key}/vote-update",
            json={
                "apiIdList": ["321"],
                "participantId": 1,
            },
        )
        data = result.get_json()

        self.assertEqual(200, result.status_code)
        self.assertEqual(1, data[0]["vote_count"])
    
    def test_event_delete(self):
        """Test delete an event."""

        # Add sample data
        event = Event(
            title="testing", event_at=datetime.now(), key="test"
        )
        db.session.add(event)
        db.session.commit()

        result = self.client.delete(
            f"/api/events/{event.key}"
        )

        find_event = Event.query.filter(Event.event_id == 1).first()

        self.assertEqual(200, result.status_code)
        self.assertEqual(None, find_event)


if __name__ == "__main__":
    unittest.main()
