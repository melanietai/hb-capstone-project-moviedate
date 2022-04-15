"""Movie Date application Flask server.

Provides web interface for creating events, searching movies, 
sending out RSVPs to friends, adding new events
to events page, and voting for movies.

Author: Melanie Tai.
"""

from flask import (Flask, render_template, redirect, flash, jsonify, request, session)
import jinja2
from model import connect_to_db, db
import crud
from sqlalchemy import update

import sys
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
        # update invitee_user_id to user.id to allow association of events
        stmt = update(crud.Participant).where(crud.Participant.email==email).values(invitee_user_id=user.id)
        db.session.add([user, stmt])
        db.session.commit()
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
        session['user_email'] = user.email
        flash(f'Welcome back, {user.email}!')

    return render_template('events.html')


@app.route("/logout")
def process_logout():
    """Log user out."""

    del session["logged_in_customer_email"]
    flash("Logged out.")
    return redirect("/melons")


@app.route('/events')
def show_invitation(key):
    """Show details on a particular invitation."""

    email = request.args.get('email')
    key = request.args.get('key')

    invitation = crud.get_invitation_by_email(email)

   
    if invitation.event.key == key:
        flash('Redirecting you to your event page.')
        return render_template('event_details.html', event = {invitation.event})
    
    else:
        flash('Your email and invitation key does not match')
        redirect ('/')









if __name__ == "__main__":
    # DebugToolbarExtension(app)
    connect_to_db(app)
    app.run(debug=True, host="0.0.0.0")