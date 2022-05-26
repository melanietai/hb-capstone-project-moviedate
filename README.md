# The Movie Date

## Overview

The Movie Date is a web app that allows users to host movie dates with friends. Users can create event, view events, update events, and delete events. After users create an event, RSVP email(s) will be sent to the invitee(s). The email will include a link, which the invitee can click to access to the event, update RSVP status and submit vote(s) for movies.

The Movie Date is built with Python Flask on the backend with a PostgreSQL database, and React on the frontend using Chakra for styling.

## The Movie Date Web App is DEPLOYED!
<strong>Check out my web app:</strong> [https://themoviedate.herokuapp.com/](https://themoviedate.herokuapp.com/)

## Features

### Create Account / Login

<p>Users can create / login to an account from the homepage.</p>
<img src="/static/homepage.png" alt="Homepage" width="1200px"/>

### Create Event

<p>Users can enter event details, friends' emails, and add up to 5 movies from the movie scroll bar. The movie scroll bar allows users to search movie by keyword or select movies from the Popular Movies and Top-Rated Movies categories. Users can read overview of an movie by clicking on the "OVERVIEW" button.</p>
<img src="/static/createevent.png" alt="Create Event Page" width="1200px"/>

### RSVP email

<p>After creation of an event, each user's friend will receive an RSVP via email, which includes an invitation link for the friend to access the event. Both user and friend can view the event, update RSVP status, and submit vote(s) for movie(s).</p>
<img src="/static/email.png" alt="RSVP Email" width="1200px"/>

### Events

<p>Users can view all the events by clicking on the "View Events" tab.</p>
<img src="/static/events.png" alt="View Events" width="1200px"/>

### View A Single Event

<p>Users can view the event by clicking on the name of the event in the events page. Invitee can view the event by clicking on the invitation link on the RSVP email.</p>

#### Update RSVP Status

<p>Users and invitees can view all participants and update RSVP status.</p>
<img src="/static/event_1.png" alt="Update RSVP" width="1200px"/>

#### Submit Votes For Movies

<p>Users and invitees can vote for movies and view current counts of votes for each movie.</p>
<img src="/static/event_2.png" alt="Submit Votes" width="1200px"/>

## Technologies

### Languages:
* Python
* JavaScript
* HTML5
* CSS
* SQL

### Frameworks & Libraries:
* React
* Flask
* Flask-JWT
* Chakra
* SQLAlchemy
* Python Unittest

### Database:
* PostgreSQL

### APIs:
* The Movie Data Base (TMDB)
* Twilio SendGrid

## How To Use

To download and use The Movie Date please follow these instructions:

  1. Download [PostgreSQL](https://www.postgresql.org/download/)
  2. In your terminal, `git clone` this repository
  3. `cd project`
  4. Create virtual environment with `virtualenv env`
  5. Activate the virtual environment with `source env/bin/activate`
  6. `pip3 install -r requirements.txt`
  7. Sign up for an account with [The Movie Data Base](https://developers.themoviedb.org/3/getting-started/introduction) and [Twilio SendGrid](https://www.twilio.com/sendgrid/email-api) 
  8. Fill out the application to obtain your secret API keys. You will need an API_KEY from TMDB and a SENDGRID_API_KEY from Twilio SendGrid API.
  9. Create a new file in the project directory called secrets.sh and paste both keys. You should add one key per line and it should follow the names listed in the above step. Each line should read: `export KEY_NAME="yoursecretkeygoeshere"`
  10. Back in your terminal, run `source secrets.sh`
  11. Next, run `python3 database.py`
  12. Run the backend server with `python3 server.py`
  13. Open a new terminal, cd into the frontend directory `cd project/frontend`
  14. Install the required dependencies with `npm install`
  15. Launch the frontend server with `npm start`
  16. The application will automatically be launched on your broswer [localhost:3000](http://localhost:3000)

## Coming Soon...

A few ideas of features to add in the future:

* Include watch providers, genres and cast information under movie details
* Add hyperlinks to movie trailers
* Enable text notifications
* Allow uers to create public movie date events