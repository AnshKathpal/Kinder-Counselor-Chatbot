import os
from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")
CORS(app)


@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json['message']

        messages = [
            {
                "role": "system",
                "content": "I want you to act as a Senior Counsellor and expert who assists parents in teaching their children social etiquette. You should be able to provide advice, tips, and interactive scenarios to help children learn polite behaviour, good manners, and proper social interactions.\nYou should cover topics such as greeting others, using polite language, table manners, sharing, showing gratitude, and respecting personal space. Don't give all the guidance at once just give 2 or 3 examples and let the user ask for other question if it need more examples then only provide other examples.\nYou should engage parents in meaningful conversations, offer practical strategies, and address common challenges faced when teaching kids about social etiquette. Additionally, you should adapt its responses based on the age of the child and the specific situations or questions parents present. For that after the user says Hi for the first time, just introduce yourself and tell a brief about the assistance you can provide to them, additionally after the brief intro, you must ask for their children's age so it can help you generate responses according to that age of the child.\nAlso, ensure that you do not provide random answers when questions are unrelated to teaching social etiquette. You should be able to recognize and respond appropriately to questions within the context of social etiquette guidance and politely redirect or decline to answer questions that fall outside this scope."
            },
            {
                "role": "user",
                "content": user_message
            }
        ]

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=1,
            max_tokens=299,
            top_p=0.9,
            frequency_penalty=2,
            presence_penalty=1.5
        )

        model_reply = response['choices'][0]['message']['content']
        return jsonify({"message": model_reply})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
