from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World! Welcome to my Flask app! Communication service"

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)