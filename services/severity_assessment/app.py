from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
import requests

app = Flask(__name__)

# Initialize Firebase
def load_json_file(filepath):
    with open(filepath) as f:
        return json.load(f)

# Load JSON configuration
json_file = os.getenv("CONFIG_FILE", "config.json")  # Default to config.json
config = load_json_file(json_file)

cred = credentials.Certificate(config['firebase'])
firebase_admin.initialize_app(cred)

db = firestore.client()

@app.route("/webhook", methods=["POST"])
def handle_request():
    data = request.get_json()  # Get the JSON data from the POST request
    document_id = data.get("document_id")
    message = data.get("message")  # Extract the message content

    # Forward the message to an external service and get the response, including severity level
    external_response = forward_to_external_service(message)

    # Send the response and severity level to Firebase
    firebase_response = send_response_to_firebase(external_response, document_id)

    # Return combined responses back to client
    return jsonify({"firebase_response": firebase_response, "external_service_response": external_response})

def forward_to_external_service(user_message):
    post_url = "http://34.150.128.121"  # Replace with the target URL

    try:
        # Send a POST request to the external service with the user message
        external_response = requests.post(post_url, json={"message": user_message})
        
        # Check if the request was successful and extract response
        if external_response.status_code == 200:
            return external_response.json()  # Assuming the response includes severity level in JSON format
        else:
            return {"status": "failed", "error": "Failed to get response from external service"}
    except Exception as e:
        return {"status": "failed", "error": str(e)}

def send_response_to_firebase(response, document_id):
    # Extract message and severity level from the external service response
    severity_level = response[0].get("text", "No response text")  # Adjust based on response structure
    
    # Reference to the specified document in Firestore
    doc_ref = db.collection("Disasters").document(document_id)

    # Set or update the document with response, severity level, and timestamp
    doc_ref.set({
        "severity_level": severity_level,
        "timestamp": firestore.SERVER_TIMESTAMP
    }, merge=True)
    
    return {"status": "success", "severity_level": severity_level}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)