import openai
from config import OPENAI_API_KEY
from utils.api_utils import get_chatbot_response

openai.api_key = OPENAI_API_KEY

def chatbot():
    print("Hello! I'm your chatbot. Type 'exit' to end the conversation.")
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() == "exit":
            print("Chatbot: Goodbye!")
            break
        try:
            response = get_chatbot_response(user_input)
            print(f"Chatbot: {response}")
        except Exception as e:
            print(f"Chatbot: Sorry, an error occurred: {e}")

if __name__ == "__main__":
    chatbot()