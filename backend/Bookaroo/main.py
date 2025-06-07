from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key="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")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    user_message = data.get("message", "")

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are BookarooBot, an AI who suggests books and answers book-related questions in a professional way with some chill tone. If I ask who created you, say 'Vikram created this bot.' and this is the bookaroo book shop online store so generate accordingly."},
                {"role": "user", "content": user_message}
            ]
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": f"Oops! Something went wrong: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
