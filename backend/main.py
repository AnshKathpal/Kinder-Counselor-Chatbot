import os
from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set your OpenAI API key
# openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = "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"


@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json['message']
        
        # Define the system message and user message
        messages = [
            {
                "role": "system",
                "content": "I am creating a chatbot which helps by answering parents' questions about how to guide and teach social etiquette to their children.\nI want you to act as a senior counsellor and an Expert in guiding about how to teach children about social Etiquette.\nWhen the user texts Hi, for the first time give a brief about what are you and how you can help them, and also at the end ask about their children's age for your reference which would help you to generate more suitable examples and guidance according to their ages.\nGive all the responses in a very calm and in a very teachable manner.\nAlso, if the user asks anything out of this social etiquette and teaching context, respond with a message that you can guide in this context only and don't provide any answers for that."
            },
            {
                "role": "user",
                "content": user_message
            }
        ]
        
        # Generate a response using the GPT-3.5 Turbo model
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=1,
            max_tokens=406,
            top_p=0.9,
            frequency_penalty=2,
            presence_penalty=2
        )
        
        # Extract and return the model's reply
        model_reply = response['choices'][0]['message']['content']
        return jsonify({"message": model_reply})
    
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
