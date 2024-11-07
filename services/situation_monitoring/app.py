from flask import Flask, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

def load_json_file(filepath):
    with open(filepath) as f:
        return json.load(f)

# Load JSON configuration
json_file = os.getenv("CONFIG_FILE", "config.json")  # Default to config.json
config = load_json_file(json_file)

cred = credentials.Certificate(config['firebase'])
firebase_admin.initialize_app(cred)

db = firestore.client()

@app.route('/')
def home():
    return "Situation Monitoring"

@app.route('/get_disasters', methods=['GET'])
def get_disasters():
    disasters_ref = db.collection('Disasters')
    disasters = disasters_ref.stream()

    disaster_list = []
    for disaster in disasters:
        disaster_data = disaster.to_dict()
        disaster_data['id'] = disaster.id  # Add document ID
        disaster_list.append(disaster_data)

    return jsonify(disaster_list)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
