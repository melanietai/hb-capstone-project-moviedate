"""The Movie Date application Flask server."""

from http.client import HTTPException
from flask import Flask, render_template, jsonify, request, abort, send_from_directory
import jinja2
from model import connect_to_db, db
import crud
from datetime import datetime, timedelta
import requests
import os
from sqlalchemy import update
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    JWTManager,
)
from rsvp import send_rsvp

ENV = os.getenv("ENV", "dev")

app = Flask(__name__, static_folder="frontend/build")

# Store secret key in secrets.sh file if you deploy your application
# A secret key is needed to use Flask sessioning features
app.secret_key = "dev"


# This configuration option makes the Flask interactive debugger
# more useful (you should remove this line in production though)
app.config["PRESERVE_CONTEXT_ON_EXCEPTION"] = True


# Setup the Flask-JWT-Extended extension
jwt = JWTManager(app)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=36000000)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

if ENV == "production":
    connect_to_db(app)


@app.route("/api/token", methods=["POST"])
def create_token():
    """Create token for user login."""
    email = request.json.get("email")
    password = request.json.get("password")

    user = crud.get_user_by_email(email)

    if not user or user.password != password:
        return ({"msg": "Invalid email or password"}), 401

    access_token = create_access_token(
        identity={"id": user.user_id, "email": user.email}
    )
    return jsonify(access_token=access_token)


@app.route("/api/user", methods=["POST"])
def user_register():
    """Register a new user."""

    fname = request.json.get("fname")
    lname = request.json.get("lname")
    email = request.json.get("email")
    password = request.json.get("password")

    if not fname or not lname or not email or not password:
        abort(400)

    user = crud.get_user_by_email(email)

    if user:
        response = jsonify({"message": "user already exists with the email"})
        response.status_code = 400
        return response

    user = crud.create_user(fname, lname, email, password)

    access_token = create_access_token(
        identity={"id": user.user_id, "email": user.email}
    )
    return jsonify(access_token=access_token)


@app.route("/api/popular-movies")
def get_popular_movies():
    """Show popular movies"""

    payload = {"api_key": os.environ["API_KEY"], "language": "en-US"}

    res = requests.get(f"https://api.themoviedb.org/3/movie/popular", params=payload)
    movies = res.json()

    return jsonify(
        [movie for movie in movies["results"] if movie["poster_path"] != None]
    )


@app.route("/api/top-rated-movies")
def get_top_rated_movies():
    """Show top rated movies"""

    payload = {"api_key": os.environ["API_KEY"], "language": "en-US"}

    res = requests.get(f"https://api.themoviedb.org/3/movie/top_rated", params=payload)
    movies = res.json()

    return jsonify(
        [movie for movie in movies["results"] if movie["poster_path"] != None]
    )


@app.route("/api/keyword-search", methods=["POST"])
@jwt_required()
def get_search_results():
    """Get search results."""

    movie_keyword = request.json.get("keyword")

    payload = {"query": {movie_keyword}, "api_key": os.environ["API_KEY"]}

    res = requests.get("https://api.themoviedb.org/3/search/movie", params=payload)

    movies = res.json()

    # return a list of movie json objects that has poster
    return jsonify(
        [movie for movie in movies["results"] if movie["poster_path"] != None]
    )


@app.route("/api/create-event", methods=["POST"])
@jwt_required()
def create_event():
    identity = get_jwt_identity()
    title = request.json.get("title")
    date = request.json.get("date")
    time = request.json.get("time")
    movies = request.json.get("movieList")
    emails = request.json.get("emails")
    current_user = crud.get_user_by_id(identity["id"])

    datetime_object = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")

    event = crud.create_event_with_emails(
        user_email=current_user.email,
        event_at=datetime_object,
        title=title,
        emails=emails,
    )

    event_id = event.event_id

    for movie in movies:
        crud.create_movie(api_id=movie["id"], event_id=event_id)
    host_email = current_user.email
    host_fname = current_user.fname
    host_lname = current_user.lname
    for email in emails:

        send_rsvp(email, event, host_fname, host_lname, host_email)

    return jsonify(event)


@app.route("/api/user/profile")
@jwt_required()
def show_user_profile():
    """Show user profile"""
    identity = get_jwt_identity()

    user = crud.get_user_by_email(identity["email"])

    return jsonify(user)


@app.route("/api/events")
@jwt_required()
def show_events():
    """Show all events"""

    identity = get_jwt_identity()

    user = crud.get_user_by_email(identity["email"])
    events = crud.get_events_by_user_id(user.user_id)

    return jsonify(events)


@app.route("/api/events/<event_key>", methods=["GET"])
def show_event(event_key):
    """Show an event associated with event key"""

    event = crud.get_event_by_event_key(event_key)
    if not event:
        abort(404)

    participants = event.participants

    return jsonify({"event": event, "participants": participants})


@app.route("/events/<event_key>", methods=["GET"])
def event_page(event_key):
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/movies/<event_id>")
def show_movies(event_id):
    """Show all movies from an event"""

    movies = crud.get_movies_by_event_id(event_id)

    print(movies)

    return jsonify(movies)


@app.route("/api/movie/<api_id>")
def show_movie(api_id):
    """Show movie associated with api_id"""

    payload = {"api_key": os.environ["API_KEY"]}

    res = requests.get(f"https://api.themoviedb.org/3/movie/{api_id}", params=payload)
    movie = res.json()

    return jsonify(movie)


@app.route("/api/events/<event_key>/rsvp", methods=["PUT"])
def update_rsvp(event_key):
    """Update rsvp response"""

    res = request.json.get("rsvp")
    email = request.json.get("email")

    event = crud.get_event_by_event_key(event_key)
    participant = crud.get_participant_by_email_and_event_id(email, event.event_id)

    stmt = (
        update(crud.Participant)
        .where(crud.Participant.participant_id == participant.participant_id)
        .values(RSVP=res)
    )

    db.session.execute(stmt)
    db.session.commit()
    db.session.refresh(participant)
    return jsonify(participant)


@app.route("/api/events/<event_key>/vote-update", methods=["PUT"])
def update_vote(event_key):
    """Update voting count for a movie"""

    api_ids = request.json.get("apiIdList")
    participant_id = request.json.get("participantId")

    event = crud.get_event_by_event_key(event_key)
    event_id = event.event_id

    movie_list = []

    crud.update_voted_for_participant_id(participant_id)

    for api_id in api_ids:
        movie = crud.get_movie_by_event_id_and_api_id(event_id, api_id)

        crud.update_vote_for_movie(movie)

        db.session.refresh(movie)
        movie_list.append(movie)

    return jsonify(movie_list)


@app.route("/api/events/<event_key>", methods=["DELETE"])
def event_delete(event_key):
    """Delete an event"""

    event = crud.get_event_by_event_key(event_key)
    db.session.delete(event)
    db.session.commit()

    return jsonify(event)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)

    app.run(debug=False, host="0.0.0.0")
