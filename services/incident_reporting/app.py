from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

app = Flask(__name__)

# Function to load the JSON file
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
    return "Incident Reporting Service!"

@app.route('/report', methods=['POST'])
def report():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ['incident_type', 'location', 'description']
    
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    reports_ref = db.collection('incident_reports')
    
    # Add the document and capture the reference
    new_report_ref = reports_ref.add(data)
    
    # Get the document_id of the newly added document
    document_id = new_report_ref[1].id  # new_report_ref is a tuple (time, doc_ref)
    
    return jsonify({"message": "Report received", "document_id": document_id, "type": data['incident_type'], "description": data['description']}), 201

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
