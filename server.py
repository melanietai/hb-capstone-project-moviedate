"""Movie Date application Flask server.

Provides web interface for browsing creating events, searching movies, 
sending out RSVPs to friends, voting for movies, and adding new events
to events page.

Authors: Melanie Tai.
"""

from flask import Flask, render_template, redirect, flash, jsonify, request
import jinja2

import sys
import os


app = Flask(__name__)

# A secret key is needed to use Flask sessioning features
app.secret_key = 'this-should-be-something-unguessable'

# Normally, if you refer to an undefined variable in a Jinja template,
# Jinja silently ignores this. This makes debugging difficult, so we'll
# set an attribute of the Jinja environment that says to make this an
# error.
app.jinja_env.undefined = jinja2.StrictUndefined

# This configuration option makes the Flask interactive debugger
# more useful (you should remove this line in production though)
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True


@app.route("/")
def index():
    """Return homepage."""

    return render_template("homepage.html")









if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")