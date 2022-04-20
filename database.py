"""Script to create database tables"""

import os
import model
import server

os.system("dropdb moviedate")
os.system('createdb moviedate')

model.connect_to_db(server.app)
model.db.create_all()

