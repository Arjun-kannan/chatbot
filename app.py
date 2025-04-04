from flask import Flask, request, jsonify
from chatbot_nlp import get_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins

@app.route('/')
def home():
    return "Chatbot is running!"

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({'error': 'No message provided'}), 400

    bot_reply = get_response(user_input)
    return jsonify({'response': bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
