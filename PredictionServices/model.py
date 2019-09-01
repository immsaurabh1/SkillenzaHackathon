from catboost import Pool, CatBoostClassifier
from sklearn.preprocessing import OneHotEncoder
import warnings
from flask import Flask, render_template
from flask import request
from flask import jsonify
from flask import Flask
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from keras.models import load_model
import pickle
import tensorflow as tf
app = Flask(__name__)
CORS(app)
warnings.filterwarnings('ignore')
# importing flask libraries
graph = tf.get_default_graph()
# # loading label encoder
# le = LabelEncoder()
# le.classes_ = np.load(
#     'classes_hack.npy', allow_pickle=True)
# # loading One Hot Encoder
# with open('ohe.pkl', 'rb') as fid:
#     ohe = pickle.load(fid)
# # loading the model
# with open('clf_cat.pkl', 'rb') as fid:
#     clf_cat = pickle.load(fid)
dataset = pd.read_csv(
    'trainms.csv')
dataset.loc[dataset[dataset['self_employed'].isnull()].index,
            'self_employed'] = 'No'
dataset.loc[dataset[dataset['state'].isnull()].index, 'state'] = 'CA'
dataset.loc[dataset[dataset['work_interfere'].isnull()].index,
            'work_interfere'] = 'O'
dataset['a'] = dataset['work_interfere'] + '-' + dataset['family_history']
dataset['b'] = dataset['work_interfere'] + '-' + dataset['self_employed']
dataset['c'] = dataset['work_interfere'] + \
    '-' + dataset['mental_health_interview']
dataset['d'] = dataset['work_interfere'] + '-' + dataset['obs_consequence']
dataset['e'] = dataset['work_interfere'] + '-' + dataset['benefits']
dataset['f'] = dataset['work_interfere'] + '-' + dataset['care_options']
dataset['g'] = dataset['family_history'] + '-' + dataset['benefits']
dataset['h'] = dataset['family_history'] + '-' + dataset['care_options']
dataset['m'] = dataset['work_interfere'] + '-' + \
    dataset['family_history'] + '-' + dataset['self_employed']
X = dataset[['family_history', 'benefits', 'care_options', 'mental_health_interview',
             'obs_consequence', 'self_employed', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
             'm']]
y = dataset['treatment']
# Label Encoding of dataset
columns = X.dtypes[X.dtypes == object].index
le_map = {}
for column in columns:
    le = LabelEncoder()
    X[column] = le.fit_transform(X[column])
    le_map[column] = le
le_y = LabelEncoder()
y = le_y.fit_transform(y)
ohe = OneHotEncoder(categorical_features=list(range(0, X.shape[1])))
X = ohe.fit_transform(X).toarray()
X = pd.DataFrame(X)
y = pd.DataFrame(y)
clf_cat = CatBoostClassifier(
    learning_rate=0.009, depth=3, iterations=600, l2_leaf_reg=10)
clf_cat.fit(X, y)


@app.route('/getPrediction', methods=['POST'])
def process():
    if request.method == 'POST':
        print(request.is_json)
        response = request.get_json()
        if 'comments' not in response:
            response['comments'] = "Empty"
        if 'work_interfere' not in response:
            response['work_interfere'] = "O"
        if 'state' not in response:
            response['state'] = "CA"
        if 'sel_employed' not in response:
            response['sel_employed'] = "No"
        if (response['Age'] < 1) & (response['Age'] > 100):
            response['Age'] = 32
        # {'Age': 44,'Gender': "M",'Country': "United States",'state': "IN",'self_employed': "No",'family_history': "No",
        # response = request.args.get('q')
# 'work_interfere': "Rarely",'no_employees': "More than 1000",'remote_work': "No",'tech_company': "No",'benefits': "Don't know",'care_options': "No",
# 'wellness_program': "Don't know",'seek_help': "Don't know",'anonymity': "Don't know",'leave': "Don't know",
# 'mental_health_consequence': "Maybe",'phys_health_consequence': "No",'coworkers': "No",'supervisor': "No",'mental_health_interview': "No",
# 'phys_health_interview': "No",'mental_vs_physical': "Don't know",'obs_consequence': "No",'comments': "Nothing"
# }#request.args.get('q')
        input = [response['Age'], response['Gender'], response['Country'], response['state'], response['self_employed'], response['family_history'], response['work_interfere'],
                 response['no_employees'], response['remote_work'], response['tech_company'], response['benefits'], response['care_options'], response['wellness_program'], response['seek_help'], response['anonymity'], response['leave'], response['mental_health_consequence'], response['phys_health_consequence'], response['coworkers'], response['supervisor'], response['mental_health_interview'], response['phys_health_interview'], response['mental_vs_physical'], response['obs_consequence'], response['comments']]
        dataset = pd.DataFrame(input).T
        dataset.columns = ['Age', 'Gender', 'Country', 'state', 'self_employed', 'family_history', 'work_interfere', 'no_employees', 'remote_work', 'tech_company', 'benefits', 'care_options', 'wellness_program', 'seek_help',
                           'anonymity', 'leave', 'mental_health_consequence', 'phys_health_consequence', 'coworkers', 'supervisor', 'mental_health_interview', 'phys_health_interview', 'mental_vs_physical', 'obs_consequence', 'comments']
        dataset['a'] = dataset['work_interfere'] + \
            '-' + dataset['family_history']
        dataset['b'] = dataset['work_interfere'] + \
            '-' + dataset['self_employed']
        dataset['c'] = dataset['work_interfere'] + \
            '-' + dataset['mental_health_interview']
        dataset['d'] = dataset['work_interfere'] + \
            '-' + dataset['obs_consequence']
        dataset['e'] = dataset['work_interfere'] + '-' + dataset['benefits']
        dataset['f'] = dataset['work_interfere'] + \
            '-' + dataset['care_options']
        dataset['g'] = dataset['family_history'] + '-' + dataset['benefits']
        dataset['h'] = dataset['family_history'] + \
            '-' + dataset['care_options']
        dataset['m'] = dataset['work_interfere'] + '-' + \
            dataset['family_history'] + '-' + dataset['self_employed']
        X = dataset[['family_history', 'benefits', 'care_options', 'mental_health_interview',
                     'obs_consequence', 'self_employed', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'm']]
        for column in X.columns:
            print(column)
            le = le_map[column]
            X[column] = le.transform(X[column])
        print(X)
        X = ohe.transform(X).toarray()
        X = pd.DataFrame(X)
        prediction = clf_cat.predict(X)
        prediction = [int(i) for i in prediction]
        answer = jsonify({'output': prediction[0]})
        answer.headers.add('Access-Control-Allow-Origin', '*')
        return(answer)


if __name__ == '__main__':
    # process()
    # main()
    app.run(host='0.0.0.0', port=5000)
    #app.run(host= '0.0.0.0')


@app.route('/getParams', methods=['GET'])
def get():
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
    response = jsonify({
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
            "key": "Often"
        }, {
            "value": "Rarely",
            "key": "Rarely"
        }, {
            "value": "Never",
            "key": "Never"
        }],
        "self_employed": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }],
        "family_history": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
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
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }],
        "tech_company": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }],
        "benefits": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Don't know",
            "key": "Don't know"
        }],
        "care_options": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Not sure",
            "key": "Not sure"
        }],
        "wellness_program": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Don't know",
            "key": "Don't know"
        }],
        "seek_help": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Don't know",
            "key": "Don't know"
        }],
        "anonymity": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Don't know",
            "key": "Don't know"
        }],
        "obs_consequence": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
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
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }],
        "phys_health_consequence": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }],
        "coworkers": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Some of them",
            "key": "Some of them"
        }],
        "supervisor": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Some of them",
            "key": "Some of them"
        }],
        "mental_health_interview": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }],
        "phys_health_interview": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }],
        "mental_vs_physical": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }
        ], "phys_health_interview": [{
            "value": "Yes",
            "key": "Yes"
        }, {
            "value": "No",
            "key": "No"
        }, {
            "value": "Maybe",
            "key": "Maybe"
        }],
        "country": [{
            "value": "Canada",
            "key": "Canada",
            "states": ["AB",
                       "BC",
                       "MB",
                       "NB",
                       "NL",
                       "NT",
                       "NS",
                       "NU",
                       "ON",
                       "PE",
                       "QC",
                       "SK",
                       "YT"]
        }, {
            "value": "United States",
            "key": "United States",
            "states": ["AL",
                       "AK",
                       "AZ",
                       "AR",
                       "AA",
                       "AE",
                       "AP",
                       "CA",
                       "CO",
                       "CT",
                       "DE",
                       "DC",
                       "FL",
                       "GA",
                       "HI",
                       "ID",
                       "PA",
                       "RI",
                       "SC",
                       "SD",
                       "TX",
                       "UT",
                       "VT",
                       "VA",
                       "WA",
                       "WV",
                       "WI",
                       "WY"]
        }, {
            "value": "United Kingdom",
            "key": "United Kingdom"
        },
            {
            "value": "Germany",
            "key": "Germany"
        }, {
            "value": "Netherlands",
            "key": "Netherlands"
        }, {
            "value": "Australia",
            "key": "Australia"
        }, {
            "value": "Ireland",
            "key": "Ireland"
        }, {
            "value": "France",
            "key": "France"
        }, {
            "value": "India",
            "key": "India"
        }, {
            "value": "Sweden",
            "key": "Sweden"
        }, {
            "value": "Switzerland",
            "key": "Switzerland"
        }, {
            "value": "New Zealand",
            "key": "New Zealand"
        }, {
            "value": "Italy",
            "key": "Italy"
        }, {
            "value": "Poland",
            "key": "Poland"
        }, {
            "value": "Belgium",
            "key": "Belgium"
        }, {
            "value": "South Africa",
            "key": "South Africa"
        }, {
            "value": "Brazil",
            "key": "Brazil"
        }, {
            "value": "Bulgaria",
            "key": "Bulgaria"
        }, {
            "value": "Mexico",
            "key": "Mexico"
        }, {
            "value": "Israel",
            "key": "Israel"
        }, {
            "value": "Russia",
            "key": "Russia"
        }, {
            "value": "Austria",
            "key": "Austria"
        }, {
            "value": "Denmark",
            "key": "Denmark"
        }, {
            "value": "Finland",
            "key": "Finland"
        }, {
            "value": "Singapore",
            "key": "Singapore"
        }, {
            "value": "Portugal",
            "key": "Portugal"
        }, {
            "value": "Slovenia",
            "key": "Slovenia"
        }, {
            "value": "Costa Rica",
            "key": "Costa Rica"
        }, {
            "value": "Thailand",
            "key": "Thailand"
        }, {
            "value": "Croatia",
            "key": "Croatia"
        }, {
            "value": "Colombia",
            "key": "Colombia"
        }, {
            "value": "Spain",
            "key": "Spain"
        }, {
            "value": "Latvia",
            "key": "Latvia"
        }, {
            "value": "Uruguay",
            "key": "Uruguay"
        }, {
            "value": "Nigeria",
            "key": "Nigeria"
        }, {
            "value": "Japan",
            "key": "Japan"
        }, {
            "value": "Hungary",
            "key": "Hungary"
        }, {
            "value": "Norway",
            "key": "Norway"
        }, {
            "value": "Zimbabwe",
            "key": "Zimbabwe"
        }, {
            "value": "Romania",
            "key": "Romania"
        }
        ],
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    # return
