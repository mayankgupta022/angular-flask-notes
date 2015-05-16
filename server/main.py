"""`main` is the top level module for your Flask application."""

# Import the Flask Framework
from flask import Flask
from google.appengine.ext import ndb
from cors import *
import json

app = Flask(__name__)
# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.

class ModelUtils(object):
	def to_dict(self):
		result = super(ModelUtils,self).to_dict()
		result['id'] = self.key.id() #get the key as a string
		return result

class NoteModel(ModelUtils, ndb.Model):
	"""A main model for representing an individual Note entry."""
	name = ndb.StringProperty(indexed=False)
	content = ndb.StringProperty(indexed=False)

@app.route('/')
def hello():
	"""Return a friendly HTTP greeting."""
	return 'Hello World!'

@app.route('/notes')
@crossdomain(origin='*')
def notes():
	notes = NoteModel.query().fetch()
	info = dict()
	info['status'] = 0
	info['data'] = [note.to_dict() for note in notes]
	return json.dumps(info)

@app.route('/newNote', methods=['POST'])
@crossdomain(origin='*')
def newNote():
	note = NoteModel(name = request.form['name'],
		content = request.form['content']
		)
	note_key = note.put()
	info = dict()
	info['status'] = 0
	info['data'] = note.to_dict()

	return json.dumps(info)

@app.route('/saveNote', methods=['POST'])
@crossdomain(origin='*')
def saveNote():
	# note = NoteModel.get_by_id(request.form['id'])
	# note_key = ndb.Key(urlsafe=str(request.form['id']))
	note_key = ndb.Key(NoteModel, str(request.form['id']))
	note = note_key.get()
	note.name = request.form['name']
	note.content = request.form['content']
	note.put()
	info = dict()
	# info['note_key'] = note_key
	info['status'] = 0
	# info['data'] = note.to_dict()

	return json.dumps(info)

@app.route('/note/<int:id>', methods=['GET', 'POST'])
@crossdomain(origin='*')
def note(id):
	note_key = ndb.Key(NoteModel, id)
	note = note_key.get()
	if request.method == 'POST':
		note.name = request.form['name']
		note.content = request.form['content']
		note.put()

	info = dict()
	info['status'] = 0
	info['data'] = note.to_dict()

	return json.dumps(info)

@app.errorhandler(404)
def page_not_found(e):
	"""Return a custom 404 error."""
	return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def application_error(e):
	"""Return a custom 500 error."""
	return 'Sorry, unexpected error: {}'.format(e), 500
