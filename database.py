"""Script to create database tables"""

import os
import model
import server
from server import ENV

if ENV == 'dev':
  os.system("dropdb moviedate")
  os.system('createdb moviedate')

  os.system("dropdb testdb")
  os.system('createdb testdb')

model.connect_to_db(server.app)
model.db.create_all()

