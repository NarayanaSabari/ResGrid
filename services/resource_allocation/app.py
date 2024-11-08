from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Resource Allocation"

@app.route("/low", methods=['POST'])
def low_allocate():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ['type', "affectedPeople", 'severity']

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    return jsonify({"fire_engine": (int(data['affectedPeople']) * 0.5) // 50, "ambulance": (int(data['affectedPeople']) * 0.2) // 2, "no_of_beds": data['affectedPeople'], "type": data['type']}), 200


@app.route("/medium", methods=['POST'])
def medium_allocate():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ['type', "affectedPeople", 'severity']

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    return jsonify({"fire_engine": (int(data['affectedPeople']) * 1) // 50, "ambulance": (int(data['affectedPeople']) * 0.5) // 2,
                    "no_of_beds": data['affectedPeople'], 'type': data['type']}), 200

@app.route("/high", methods=['POST'])
def high_allocate():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ['type', "affectedPeople", 'severity']

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    return jsonify({"fire_engine": (int(data['affectedPeople']) * 1.5) // 50, "ambulance": (int(data['affectedPeople']) * 0.8) // 2,
                    "no_of_beds": data['affectedPeople'], 'type': data['type']}), 200

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)
