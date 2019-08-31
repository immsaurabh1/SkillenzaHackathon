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
            "key": "M"
        }, {
            "value": "Female",
            "key": "F"
        }, {
            "value": "Others",
            "key": "O"
        }],
        "work_interfere": [{
            "value": "Often",
            "key": "often"
        }, {
            "value": "Rarely",
            "key": "rarely"
        }, {
            "value": "Never",
            "key": "never"
        }],
        "self_employed": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }],
        "family_history": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }],
        "no_employees": [{
            "value": "1-5",
            "key": "1-5"
        }, {
            "value": "6-25",
            "key": "6-25"
        },
            {
            "value": "26-100",
            "key": "26-100"
        }, {
            "value": "100-500",
            "key": "100-500"
        },
            {
            "value": "More than 1000",
            "key": "More than 1000"
        }
        ],
        "remote_work": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }],
        "tech_company": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }],
        "benefits": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Don't know",
            "key": "Don't know"
        }],
        "care_options": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Not sure",
            "key": "Not sure"
        }],
        "wellness_program": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Don't know",
            "key": "Don't know"
        }],
        "seek_help": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Don't know",
            "key": "Don't know"
        }],
        "anonymity": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Don't know",
            "key": "Don't know"
        }],
        "leave": [{
            "value": "Somewhat easy",
            "key": "Somewhat easy"
        }, {
            "value": "Somewhat difficult",
            "key": "Somewhat difficult"
        }, {
            "value": "Don't know",
            "key": "Don't know"
        }, {
            "value": "Very difficult",
            "key": "Very difficult"
        }, {
            "value": "Very easy",
            "key": "Very easy"
        }
        ], "mental_health_consequence": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }],
        "phys_health_consequence": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }],
        "coworkers": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Some of them",
            "key": "Some of them"
        }],
        "supervisor": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Some of them",
            "key": "Some of them"
        }],
        "mental_health_interview": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }],
        "phys_health_interview": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }],
        "mental_vs_physical": [{
            "value": "Yes",
            "key": "yes"
        }, {
            "value": "No",
            "key": "no"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }
        ]

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
        "key": "asasx"
    }


app.run(host='0.0.0.0', port=5000)
