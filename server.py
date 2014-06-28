#!flask/bin/python

from flask import Flask, jsonify, abort, request, make_response, url_for
from flask.views import MethodView
from flask.ext.restful import Api, Resource, reqparse, fields, marshal
from flask.ext.httpauth import HTTPBasicAuth

app = Flask(__name__, static_url_path = "", static_folder = "dist")
api = Api(app)
auth = HTTPBasicAuth()

tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'completed': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'completed': False
    }
]

task_fields = {
    'id': fields.Integer,
    'title': fields.String,
    'completed': fields.Boolean,
}

class TaskListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type = str, required = True, help = 'No task title provided', location = 'json')
        super(TaskListAPI, self).__init__()

    def get(self):
        return map(lambda t: marshal(t, task_fields), tasks)

    def post(self):
        args = self.reqparse.parse_args()
        task = {
            'id': 0 if len(tasks) == 0 else tasks[-1]['id'] + 1,
            'title': args['title'],
            'completed': False
        }
        tasks.append(task)
        return marshal(task, task_fields), 201

class TaskAPI(Resource):

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type = str, location = 'json')
        self.reqparse.add_argument('completed', type = bool, location = 'json')
        super(TaskAPI, self).__init__()

    def get(self, id):
        task = filter(lambda t: t['id'] == id, tasks)
        if len(task) == 0:
            abort(404)
        return { 'task': marshal(task[0], task_fields) }

    def put(self, id):
        task = filter(lambda t: t['id'] == id, tasks)
        if len(task) == 0:
            abort(404)
        task = task[0]
        args = self.reqparse.parse_args()
        for k, v in args.iteritems():
            if v != None:
                task[k] = v
        return { 'task': marshal(task, task_fields) }

    def delete(self, id):
        task = filter(lambda t: t['id'] == id, tasks)
        if len(task) == 0:
            abort(404)
        tasks.remove(task[0])
        return { 'result': True }

api.add_resource(TaskListAPI, '/todo/api/v1.0/tasks', endpoint = 'tasks')
api.add_resource(TaskAPI, '/todo/api/v1.0/tasks/<int:id>', endpoint = 'task')

@app.route('/')
def root():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug = True)
