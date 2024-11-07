from flask import Flask, request, jsonify

app = Flask(__name__)

deployment_counts = {
    "low": 1,     # Low severity: 1 official
    "medium": 2,  # Medium severity: 2 officials
    "high": 5,    # High severity: 5 officials
    "critical": 10 # Critical severity: 10 officials
}

@app.route('/')
def home():
    return "Hello, World! Welcome to my Flask app! Communication service"

@app.route('/broadcast', methods=['POST'])
def broadcast():
    data = request.get_json()

    resource = data.services
    severity = data.severity

    count = deployment_counts[severity]

    # Create a response dictionary with service names and their respective counts
    response = {service: count for service in resource}

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)