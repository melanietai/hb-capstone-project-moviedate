from server import app
from unittest import TestCase
import unittest
from model import connect_to_db, db, User
from flask_jwt_extended import (create_access_token)


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
        rachel = User(
            fname="Rachel", lname="Smith", email="rsmith@example.com", password="rachel"
        )
        db.session.add(rachel)
        db.session.commit()

        result = self.client.post(
            "/token", json={"email": "rsmith@example.com", "password": "rachel"}
        )

        self.assertEqual(200, result.status_code)
        token = result.get_json().get("access_token")
        self.assertEqual(str, type(token))
        self.assertNotEqual(0, len(token))

    def test_user_register(self):
        """Test new user registration."""

        result = self.client.post(
            "/user",
            json={
                "fname": "Rachel",
                "lname": "Smith",
                "email": "rsmith@example.com",
                "password": "rachel",
            },
        )

        self.assertEqual(200, result.status_code)
        token = result.get_json().get("access_token")
        self.assertEqual(str, type(token))
        self.assertNotEqual(0, len(token))







if __name__ == "__main__":
    unittest.main()
