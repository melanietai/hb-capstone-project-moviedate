from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from flask import (url_for)
import os


def send_rsvp(email, event, host_fname, host_lname, host_email):
    url = url_for('show_event', _external=True, event_key=event.key, email=email)
    message = Mail(
    from_email='moviedatecapstone@gmail.com',
    to_emails=email,
    subject=f'Please RSVP: Movie Date on {event.event_at.date()} at {event.event_at.time()}',
    html_content="""\
      <html>
        <body>
          <h2>You have been invited to a movie date!</h2>
          <h4>Host: {host_fname} {host_lname} ({host_email}) </h4>
          <h4>Event Name: {event_title}</h4>
          <h4>Date: {event_date}</h4>
          <h4>Time: {event_time}</h4>
          <p>Please click on the access link below to view invitation and event's details:</p>
          <p>{url}</p>
          <p>You can update your RSVP status, vote for movies to watch together, and many more!</p>
        </body>
      </html>
      """.format(event_date=event.event_at.date(), host_fname=host_fname, host_lname=host_lname, event_time=event.event_at.time(), host_email=host_email, url=url, key=event.key, event_title=event.title)
    )

    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    response = sg.send(message)
    print(response.status_code, response.body, response.headers)
    return response