import spacy

nlp = spacy.load("en_core_web_sm")

def get_response(user_input):
    doc = nlp(user_input.lower())

    if "hello" in user_input:
        return "Hi there! How can I help you?"
    elif "bye" in user_input:
        return "Goodbye!"
    elif any(token.lemma_ == "weather" for token in doc):
        return "Sorry, I can't give weather updates yet!"
    else:
        return "Hmm... I didn't quite catch that."
