"""Movie Date application Flask server.

Provides web interface for creating events, searching movies, 
sending out RSVPs to friends, adding new events
to events page, and voting for movies.

"""

from flask import (Flask, render_template, redirect, flash, jsonify, request, session)
import jinja2
from model import connect_to_db, db
import crud
from datetime import datetime
import requests
import json
import os


app = Flask(__name__)

# Store secret key in secrets.sh file if you deploy your application
# A secret key is needed to use Flask sessioning features
app.secret_key = 'dev'

# Normally, if you refer to an undefined variable in a Jinja template,
# Jinja silently ignores this. This makes debugging difficult, so we'll
# set an attribute of the Jinja environment that says to make this an
# error.
app.jinja_env.undefined = jinja2.StrictUndefined

# This configuration option makes the Flask interactive debugger
# more useful (you should remove this line in production though)
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True


@app.route('/')
def index():
    """Return homepage."""
    if session:
        
        events = crud.get_events_by_user_id(session['current_user_id'])

        return render_template('events.html', events=events)

    return render_template('homepage.html')

@app.route('/users', methods=['POST'])
def register_user():
    """Create a new user."""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)

    if user:
        flash("Cannot create an account with that email. Try again.")
    else:
        user = crud.create_user(email, password)
        
        flash('Account created! Please log in.')

    return redirect("/")


@app.route('/login', methods=['POST'])
def process_login():
    """Process user login."""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash('The email or password you entered was incorrect.')
    else:
        # Log in user by storing the user's email in session
        session['current_user_email'] = user.email
        session['current_user_id'] = user.user_id
        flash(f'Welcome back, {user.email}!')
    return redirect("/")


@app.route('/logout')
def process_logout():
    """Log user out."""

    del session['user_email']
    flash('Logged out.')
    return redirect('/')


@app.route('/invitation')
def show_invitation():
    """Show details on an event by an invitation."""

    email = request.args.get('email')
    key = request.args.get('key')

    event = crud.get_event_by_email_and_key(email=email, key=key)
   
    if event:
        flash('Redirecting you to your event page.')
        return render_template('event_details.html', display_event=event)
    
    else:
        flash('Your email and invitation key does not match')
        return redirect ('/')


@app.route('/events/<event_id>')
def show_event(event_id):
    """Show details on a participant event"""

    event = crud.get_event_by_event_id(event_id)
    
    return render_template("event_details.html", display_event=event)


@app.route('/events/new-event')
def new_event():

    return render_template("create_event.html")

@app.route('/events/create-event', methods=['POST'])
def create_event():

    event_title = request.form.get('title')
    date = request.form.get('date')
    time = request.form.get('time')
    # emails = []
    # movie_api_ids = []

    datetime_object = datetime.strptime(f'{date} {time}', '%Y-%m-%d %H:%M')
    
    event = crud.create_event_with_emails(event_at=datetime_object, title=event_title, emails=emails)

    event_id = event.event_id

    for api_id in movie_api_ids:
        crud.create_movie(api_id=api_id, event_id=event_id)

    return redirect ("/")
    

@app.route("/api/search-movies", methods=["POST"])
def get_search_result():
    """Get search results."""
    print('test search')
    movie_keyword = request.json.get("keyword")
    
    payload = {'query': {movie_keyword},
               'api_key': os.environ['API_KEY']}

    res = requests.get('https://api.themoviedb.org/3/search/movie', params=payload)

    movies = res.json()
    print(res.json())

    # return a list of movie json objects
    return jsonify(movies["results"])




if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0")