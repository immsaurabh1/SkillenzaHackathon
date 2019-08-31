#!flask/bin/python
from flask import request
from flask import Flask
from flask import jsonify
app = Flask(__name__)
app = Flask(__name__)


@app.route('/getParams', methods=['GET'])
def get():
    print(request.is_json)
    # content = request.get_json()
    # print(content)c
    # print(request.get_json())
    # print(content['name'])
    return {
        "name": "tdwdvw",
        "id": "asasx"
    }


app.run(host='0.0.0.0', port=5000)
