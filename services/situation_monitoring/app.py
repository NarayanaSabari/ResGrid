from flask import Flask

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
    return "Hello, World! Welcome to my Flask app! Situation Monitoring"

@app.route('/get_options', methods=['GET'])
def get_options():



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)