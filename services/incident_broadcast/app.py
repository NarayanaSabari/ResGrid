from flask import Flask, request, jsonify
import time

app = Flask(__name__)

@app.route("/")
def home():
    return "Incident broadcast", 200

@app.route('/broadcast', methods=['POST'])
def broadcast():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ['type', 'severity']

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    message = f'A/An {data["type"]} has occurred nearby and the severity of it is {data["severity"]}. PLease stay safe with proper precaution. Related emergency services have been reported about the incident.'

    print(f'Message: {message}')
    print('Broadcasting the message to people around that area')
    for _ in range(10):
        print(".", end="", flush=True)  # Print dot without a newline
        time.sleep(1)  # Wait for 1 second

    return jsonify({
        'message': message,
        'status': 'Broadcast complete'
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)