from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

app = Flask(__name__)

# def load_json_file(filepath):
#     with open(filepath) as f:
#         return json.load(f)
#
# # Load JSON configuration
# json_file = os.getenv("CONFIG_FILE", "config.json")  # Default to config.json
# config = load_json_file(json_file)
#
# cred = credentials.Certificate(config['firebase'])
# firebase_admin.initialize_app(cred)
#
# db = firestore.client()
#
# deployment_counts = {
#     "low": 1,     # Low severity: 1 official
#     "medium": 2,  # Medium severity: 2 officials
#     "high": 5,    # High severity: 5 officials
#     "critical": 10 # Critical severity: 10 officials
# }

@app.route('/')
def home():
    return "Communication service"

@app.route('/broadcast', methods=['POST'])
def broadcast():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ['fire_engine', 'ambulance', 'no_of_beds', 'type']

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    return jsonify({
        'Message': f'A {data["type"]} has been reported',
        'Fire station': f'We are requesting {data["fire_engine"]} to be dispatched to the location',
        'Hospital': f'We are requesting {data["no_of_beds"]} vacant beds',
        'Ambulance service': f'We are requesting {data["ambulance"]} ambulance to reach the spot'
    }), 200


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)