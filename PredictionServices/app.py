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
    # 'Age', 'Gender', 'Country', 'state',
    # 'self_employed', 'family_history', 'treatment', 'work_interfere',
    # 'no_employees', 'remote_work', 'tech_company', 'benefits',
    # 'care_options', 'wellness_program', 'seek_help', 'anonymity', 'leave',
    # 'mental_health_consequence', 'phys_health_consequence', 'coworkers',
    # 'supervisor', 'mental_health_interview', 'phys_health_interview',
    # 'mental_vs_physical', 'obs_consequence'
    return {
        "gender": [{
            "value": "Male",
            "id": "M"
        }, {
            "value": "Female",
            "id": "F"
        }, {
            "value": "Others",
            "id": "O"
        }],
        "work_interfere": [{
            "value": "Often",
            "id": "often"
        }, {
            "value": "Rarely",
            "id": "rarely"
        }, {
            "value": "Never",
            "id": "never"
        }],
        "self_employed": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }],
        "family_history": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }],
        "no_employees": [{
            "value": "1-5",
            "id": "1-5"
        }, {
            "value": "6-25",
            "id": "6-25"
        },
            {
            "value": "26-100",
            "id": "26-100"
        }, {
            "value": "100-500",
            "id": "100-500"
        },
            {
            "value": "More than 1000",
            "id": "More than 1000"
        }
        ],
        "remote_work": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }],
        "tech_company": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }],
        "benefits": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }, {
            "value": "Don't know",
            "id": "Don't know"
        }],
        "care_options": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }, {
            "value": "Not sure",
            "id": "Not sure"
        }],
        "wellness_program": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }, {
            "value": "Don't know",
            "id": "Don't know"
        }],
        "seek_help": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }, {
            "value": "Don't know",
            "id": "Don't know"
        }],
        "anonymity": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }, {
            "value": "Don't know",
            "id": "Don't know"
        }],
        "leave": [{
            "value": "Somewhat easy",
            "id": "Somewhat easy"
        }, {
            "value": "Somewhat difficult",
            "id": "Somewhat difficult"
        }, {
            "value": "Don't know",
            "id": "Don't know"
        }, {
            "value": "Very difficult",
            "id": "Very difficult"
        }, {
            "value": "Very easy",
            "id": "Very easy"
        }
        ], "mental_health_consequence": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }, {
            "value": "Maybe",
            "id": "Maybe"
        }],
        "phys_health_consequence": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }, {
            "value": "Maybe",
            "id": "Maybe"
        }],
        "coworkers": [{
            "value": "Yes",
            "id": "yes"
        }, {
            "value": "No",
            "id": "no"
        }, {
            "value": "Some of them",
            "id": "Some of them"
        }]

    }


@app.route('/getPrediction', methods=['POST'])
def post():
    print(request.is_json)
    content = request.get_json()
    print(content)
    print(request.get_json())
    print(content['name'])
    return {
        "name": "tdwdvw",
        "id": "asasx"
    }


app.run(host='0.0.0.0', port=5000)
