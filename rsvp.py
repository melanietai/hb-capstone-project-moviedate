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
          <p>{host_fname} {host_lname} has invited to a movie date!</p>
          <p>{host_email} has invited you to join a movie date on {event_date} at {event_time}. 
          Please click on the link {url} to RSVP and view event details with your email and Access Key {key}
          </p>
        </body>
      </html>
      """.format(event_date=event.event_at.date(), host_fname=host_fname, host_lname=host_lname, event_time=event.event_at.time(), host_email=host_email, url=url, key=event.key)
    )

    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    response = sg.send(message)
    print(response.status_code, response.body, response.headers)
    return response