from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import re
import logging
import os
import json

app = Flask(__name__)

def load_json_file(filepath):
    with open(filepath) as f:
        return json.load(f)

# Load JSON configuration
json_file = os.getenv("CONFIG_FILE", "config.json")  # Default to config.json
config = load_json_file(json_file)

cred = credentials.Certificate(config['firebase'])
firebase_admin.initialize_app(cred)

db = firestore.client()

logging.basicConfig(level=logging.DEBUG)

# Define severity rules using regex patterns
severity_rules = {
    "Earthquake": {
        "high": lambda desc: re.search(r'\bmagnitude\s*(?:of\s*)?([6-9](?:\.\d+)?)\b', desc, re.IGNORECASE) is not None,
        "medium": lambda desc: re.search(r'\bmagnitude\s*(?:of\s*)?([4-5](?:\.\d+)?)\b', desc,
                                         re.IGNORECASE) is not None,
        "low": lambda desc: re.search(r'\bmagnitude\s*(?:of\s*)?([0-3](?:\.\d+)?)\b', desc, re.IGNORECASE) is not None
    },
    "Flood": {
        "high": lambda desc: "severe" in desc.lower() or "evacuate" in desc.lower(),
        "medium": lambda desc: "flood" in desc.lower() and "warning" in desc.lower(),
        "low": lambda desc: "flood" in desc.lower()
    },
    "Fire": {
        "high": lambda desc: "wildfire" in desc.lower(),
        "medium": lambda desc: "fire" in desc.lower() and "alert" in desc.lower(),
        "low": lambda desc: "fire" in desc.lower()
    },
    "Cyclone": {
        "high": lambda desc: "severe" in desc.lower() or "evacuate" in desc.lower(),
        "medium": lambda desc: "cyclone" in desc.lower() and "warning" in desc.lower(),
        "low": lambda desc: "cyclone" in desc.lower()
    },
    "Storm": {
        "high": lambda desc: "severe" in desc.lower() or "evacuate" in desc.lower(),
        "medium": lambda desc: "storm" in desc.lower() and "warning" in desc.lower(),
        "low": lambda desc: "storm" in desc.lower()
    },
    "Drought": {
        "high": lambda desc: "severe" in desc.lower() or "water shortage" in desc.lower(),
        "medium": lambda desc: "drought" in desc.lower() and "warning" in desc.lower(),
        "low": lambda desc: "drought" in desc.lower()
    },
    "Landslide": {
        "high": lambda desc: "severe" in desc.lower() or "evacuate" in desc.lower(),
        "medium": lambda desc: "landslide" in desc.lower() and "warning" in desc.lower(),
        "low": lambda desc: "landslide" in desc.lower()
    },
    "Industrial Accident": {
        "high": lambda desc: "severe" in desc.lower() or "evacuate" in desc.lower(),
        "medium": lambda desc: "industrial accident" in desc.lower() and "warning" in desc.lower(),
        "low": lambda desc: "industrial accident" in desc.lower()
    },
    "Environmental Disaster": {
        "high": lambda desc: "severe" in desc.lower() or "evacuate" in desc.lower(),
        "medium": lambda desc: "environmental disaster" in desc.lower() and "warning" in desc.lower(),
        "low": lambda desc: "environmental disaster" in desc.lower()
    },
    "Health Crisis": {
        "high": lambda desc: "severe" in desc.lower() or "outbreak" in desc.lower(),
        "medium": lambda desc: "health crisis" in desc.lower() and "warning" in desc.lower(),
        "low": lambda desc: "health concern" in desc.lower()
    },
    "Transportation Accident": {
        "high": lambda desc: "severe" in desc.lower() or "casualties" in desc.lower(),
        "medium": lambda desc: "accident" in desc.lower() and "warning" in desc.lower(),
        "low": lambda desc: "minor accident" in desc.lower()
    }
}

@app.route('/')
def home():
    return "Severity Assessment"

@app.route('/detect_severity', methods=['POST'])
def detect_severity():
    data = request.get_json()
    app.logger.info(f"Received data: {data}")

    disaster_type = data['type']
    description = data['description']
    severity_level = 'unknown'

    app.logger.info(f"Disaster type: {disaster_type}")
    app.logger.info(f"Description: {description}")

    if disaster_type in severity_rules:
        app.logger.info(f"Checking severity rules for {disaster_type}")
        for level, condition in severity_rules[disaster_type].items():
            app.logger.info(f"Checking condition for {level} severity")
            if condition(description):
                severity_level = level
                app.logger.info(f"Matched severity level: {level}")
                break
        else:
            app.logger.warning(f"No severity level matched for {disaster_type}")
    else:
        app.logger.warning(f"No severity rules found for disaster type: {disaster_type}")

    result = {"severity": severity_level}
    app.logger.info(f"Returning result: {result}")
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
