from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World! Welcome to my Flask app! Situation Monitoring"

@app.route('/get_options', methods=['GET'])
def get_options():



if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)