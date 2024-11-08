# from flask import Flask, request, jsonify
# import firebase_admin
# from firebase_admin import credentials, firestore
# import os
# import json
# import requests

# app = Flask(__name__)

# # Initialize Firebase
# def load_json_file(filepath):
#     with open(filepath) as f:
#         return json.load(f)

# # Load JSON configuration
# json_file = os.getenv("CONFIG_FILE", "config.json")  # Default to config.json
# config = load_json_file(json_file)

# cred = credentials.Certificate(config['firebase'])
# firebase_admin.initialize_app(cred)

# db = firestore.client()

# @app.route("/webhook", methods=["POST"])
# def handle_request():
#     # Check if the request contains JSON data
#     if request.is_json:
#         data = request.get_json()
#         # Log the received data
#         app.logger.info(f"Received JSON data: {data}")
#     else:
#         # Log form data or other request types
#         data = request.form
#         app.logger.info(f"Received form data: {data}")
#     document_id = data.get("document_id")
#     message = data.get("description")  # Extract the message content

#     # Forward the message to an external service and get the response, including severity level
#     external_response = forward_to_external_service(message)
#     app.logger.info(f"external_response  data: {external_response}")
#     # Send the response and severity level to Firebase
#     firebase_response = send_response_to_firebase(external_response, document_id)

#     # Return combined responses back to client
#     return jsonify({"firebase_response": firebase_response, "external_service_response": external_response})

# def forward_to_external_service(user_message):
#     post_url = "http://34.150.128.121"  # Replace with the target URL

#     try:
#         # Send a POST request to the external service with the user message
#         external_response = requests.post(
#             post_url,
#             json={"sender": "test_user", "message": user_message},
#             headers={"Content-Type": "application/json"}
#         )
#         # Check if the request was successful and extract response
#         if external_response.status_code == 200:
#             return external_response.json()  # Assuming the response includes severity level in JSON format
#         else:
#             return {"status": "failed", "error": "Failed to get response from external service"}
#     except Exception as e:
#         return {"status": "failed", "error": str(e)}

# def send_response_to_firebase(response, document_id):
#     # Extract message and severity level from the external service response
#     severity_level = response.get("text", "No response text")  # Adjust based on response structure
    
#     # Reference to the specified document in Firestore
#     doc_ref = db.collection("Disasters").document(document_id)

#     # Set or update the document with response, severity level, and timestamp
#     doc_ref.set({
#         "severity_level": severity_level,
#         "timestamp": firestore.SERVER_TIMESTAMP
#     }, merge=True)
    
#     return {"status": "success", "severity_level": severity_level}

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
import requests

app = Flask(__name__)

# Initialize Firebase
def load_json_file(filepath):
    try:
        with open(filepath) as f:
            return json.load(f)
    except FileNotFoundError:
        app.logger.error(f"Config file not found: {filepath}")
        raise
    except json.JSONDecodeError:
        app.logger.error(f"Error decoding JSON from config file: {filepath}")
        raise

# Load JSON configuration
json_file = os.getenv("CONFIG_FILE", "config.json")  # Default to config.json
config = load_json_file(json_file)

# Initialize Firebase
cred = credentials.Certificate(config['firebase'])
firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

@app.route("/webhook", methods=["POST"])
def handle_request():
    # Check if the request contains JSON data
    if request.is_json:
        data = request.get_json()["data"]
        # Log the received data
        app.logger.info(f"Received JSON data: {data}")
    else:
        # Log form data or other request types
        data = request.form
        app.logger.info(f"Received form data: {data}")

    # Extract document_id and message (description)
    document_id = data.get("document_id")
    message = data.get("description")

    if not document_id or not message:
        app.logger.error("Missing 'document_id' or 'description' in the request data")
        return jsonify({"error": "Missing 'document_id' or 'description'"}), 400

    # Forward the message to an external service and get the response, including severity level
    external_response = forward_to_external_service(message)
    app.logger.info(f"External response data: {external_response}")

    # Send the response and severity level to Firebase
    firebase_response = send_response_to_firebase(external_response, document_id)

    # Return combined responses back to the client
    return jsonify({"firebase_response": firebase_response, "external_service_response": external_response})

def forward_to_external_service(user_message):
    post_url = "http://34.150.128.121"  # Replace with the target URL

    try:
        # Send a POST request to the external service with the user message
        external_response = requests.post(
            post_url,
            json={"sender": "test_user", "message": user_message},
            headers={"Content-Type": "application/json"}
        )
        # Check if the request was successful and extract the response
        if external_response.status_code == 200:
            return external_response.json()  # Assuming the response includes severity level in JSON format
        else:
            app.logger.error(f"Error from external service: {external_response.status_code} - {external_response.text}")
            return {"status": "failed", "error": "Failed to get response from external service"}
    except requests.exceptions.RequestException as e:
        app.logger.error(f"Error making POST request to external service: {e}")
        return {"status": "failed", "error": str(e)}

def send_response_to_firebase(response, document_id):
    # Extract message and severity level from the external service response
    severity_level = response[0].get("text", "No response text")  # Adjust based on response structure

    # Reference to the specified document in Firestore
    doc_ref = db.collection("Disasters").document(document_id)

    try:
        # Set or update the document with response, severity level, and timestamp
        doc_ref.set({
            "severity_level": severity_level,
            "timestamp": firestore.SERVER_TIMESTAMP
        }, merge=True)
        return {"status": "success", "severity_level": severity_level}
    except Exception as e:
        app.logger.error(f"Error updating Firestore: {e}")
        return {"status": "failed", "error": str(e)}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)