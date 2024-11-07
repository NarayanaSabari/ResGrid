from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import os
import json

nltk.download('punkt_tab')
nltk.download('stopwords')

emergency_services_mapping = {
    "fire": ["Fire Department", "Emergency Medical Services", "Police"],
    "house fire": ["Fire Department", "Emergency Medical Services", "Police"],
    "wildfire": ["Fire Department", "Emergency Medical Services", "National Guard"],
    "structure fire": ["Fire Department", "Emergency Medical Services", "Police"],

    "flood": ["Emergency Services", "Fire Department", "National Guard"],
    "flash flood": ["Emergency Services", "Fire Department", "Rescue Teams"],
    "water damage": ["Emergency Services", "Fire Department"],

    "car accident": ["Emergency Medical Services", "Police", "Tow Truck Services"],
    "vehicle collision": ["Emergency Medical Services", "Police"],
    "motorcycle crash": ["Emergency Medical Services", "Police"],

    "earthquake": ["Emergency Services", "Fire Department", "Search and Rescue"],
    "seismic activity": ["Emergency Services", "Fire Department"],

    "gas leak": ["Fire Department", "Emergency Medical Services", "Hazardous Materials Team"],
    "chemical spill": ["Hazardous Materials Team", "Fire Department"],

    "bomb threat": ["Police", "Bomb Squad", "Emergency Services"],
    "active shooter": ["Police", "Emergency Medical Services"],

    "missing person": ["Search and Rescue", "Police"],
    "search operation": ["Search and Rescue", "Emergency Services"],

    "public health emergency": ["Emergency Medical Services", "Public Health Officials"],
    "pandemic outbreak": ["Emergency Medical Services", "Public Health Officials"],

    "power outage": ["Utility Company", "Emergency Services"],
    "infrastructure collapse": ["Emergency Services", "Fire Department", "Rescue Teams"],

    "animal attack": ["Animal Control", "Emergency Medical Services"],
    "dog bite": ["Emergency Medical Services", "Animal Control"],
}


def identify_keywords(scenario):
    tokens = word_tokenize(scenario.lower())
    stop_words = set(stopwords.words('english'))

    # Remove stop words
    filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
    return filtered_tokens


def identify_emergency_services(scenario):
    keywords = identify_keywords(scenario)

    # Initialize identified services based on the scenario
    identified_services = set()

    # Define specific keywords for scenarios
    fire_keywords = {"fire", "burning", "flame", "smoke"}
    flood_keywords = {"flood", "water", "drowning"}
    accident_keywords = {"accident", "collision", "crash", "vehicle"}
    earthquake_keywords = {"earthquake", "tremor", "quake"}
    gas_leak_keywords = {"gas", "leak", "chemical"}

    # Check for fire-related keywords
    if any(keyword in fire_keywords for keyword in keywords):
        identified_services.update(["Fire Department", "Emergency Medical Services"])

    # Check for flood-related keywords
    if any(keyword in flood_keywords for keyword in keywords):
        identified_services.update(["Emergency Services", "Fire Department", "National Guard"])

    # Check for accident-related keywords
    if any(keyword in accident_keywords for keyword in keywords):
        identified_services.update(["Emergency Medical Services", "Police", "Tow Truck Services"])

    # Check for earthquake-related keywords
    if any(keyword in earthquake_keywords for keyword in keywords):
        identified_services.update(["Emergency Services", "Fire Department", "Search and Rescue"])

    # Check for gas leak-related keywords
    if any(keyword in gas_leak_keywords for keyword in keywords):
        identified_services.update(["Fire Department", "Emergency Medical Services", "Hazardous Materials Team"])

    # Return the identified services as a list
    return list(identified_services) if identified_services else ["No services found for this scenario."]


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

@app.route('/')
def home():
    return "Resource Allocation"

@app.route("/allocate", methods=['POST'])
def allocate():
    data  = request.get_json()

    # document_id = data["document_id"]
    # reports_ref = db.collection('incident_reports')
    # report = reports_ref.document(document_id)
    # doc = report.get()
    # data = doc.to_dict()
    type = "Forest fire"
    ans=identify_emergency_services(type)
    return jsonify(services=ans)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)
