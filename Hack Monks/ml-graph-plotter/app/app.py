from flask import Flask, jsonify, render_template
import os
import json

app = Flask(__name__)

# Function to read data from dataset.json
def read_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            return json.load(file)
    return []

# Route to serve the HTML page
@app.route('/')
def home():
    return render_template('index.html')

# API route to return data for analysis
@app.route('/api/get-analytics-data', methods=['GET'])
def get_analytics_data():
    file_path = os.path.join(os.path.dirname(__file__), 'dataset.json')
    data = read_json(file_path)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)