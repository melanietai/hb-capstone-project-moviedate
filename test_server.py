from server import app
from unittest import TestCase
import unittest
from model import connect_to_db, db, User

class MyAppIntegrationTestCase(TestCase):
    """Testing Flask server."""

    def setUp(self):
        """Stuff to do before every test."""

        # Get the Flask test client
        self.client = app.test_client()
        app.config["TESTING"] = True

        # Connect to test database
        connect_to_db(app, "postgresql:///testdb")

        # Create tables
        db.create_all()

    def tearDown(self):
        """Stuff to do after each test."""
        db.drop_all()

    def test_create_token(self):
        """Test user login."""


        # Add sample data
        rachel = User(fname="Rachel", lname="Smith", email="rsmith@example.com", password="rachel")
        db.session.add(rachel)
        db.session.commit()

        result = self.client.post(
            "/token", json={"email": "rsmith@example.com", "password": "rachel"}
        )

        self.assertEqual(200, result.status_code)
        token = result.get_json().get('access_token')
        self.assertEqual(str, type(token))
        self.assertNotEqual(0, len(token))

    # def test_user_register(self):
    #     """Test new user registration."""

    #       result = self.client.post("/user",
    #                                 data={"fname": "Rachel",
    #                                       "lname": "Smith",
    #                                       "email": "abc@example.com",
    #                                       "password": "123"
    #                                     }
    #                                 )

    #     self.assertIn()

    # def test_get_popular_movies(self):
    #     """Test external API call to get popular movies"""

    #     result = self.client.get("/popular-movies")

    #     self.assertEqual(result.status_code, 200)
    #     self.assertIn()


if __name__ == "__main__":
    unittest.main()
