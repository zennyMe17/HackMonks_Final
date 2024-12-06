import os
import google.generativeai as genai

# Configure API Key
def configure_api():
    genai.configure(api_key="AIzaSyBvkA_FEfkJLAf2_L7nR4ogOfixLOI7vqI")  # Replace with your actual API key

# Analyze sentiment using Gemini API
def analyze_sentiment_with_gemini(response_text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    analysis = model.generate_content(f"Analyze the sentiment of this text: '{response_text}'")
    return analysis.text.strip()

# Map sentiment descriptions to numerical scores
def sentiment_to_score(sentiment):
    if "positive" in sentiment.lower():
        return 80  # Positive sentiment
    elif "neutral" in sentiment.lower():
        return 50  # Neutral sentiment
    elif "negative" in sentiment.lower():
        return 20  # Negative sentiment
    else:
        return 50  # Default to neutral

# Perform sentiment analysis and generate only overall sentiment summary
def perform_sentiment_analysis(input_file_path, output_file_path):
    with open(input_file_path, 'r') as file:
        lines = file.readlines()

    total_score = 0
    count = 0

    for line in lines:
        if "-" in line:
            _, response = map(str.strip, line.split("-", 1))
            sentiment_description = analyze_sentiment_with_gemini(response)
            score = sentiment_to_score(sentiment_description)
            total_score += score
            count += 1

    # Calculate overall sentiment score
    average_score = total_score / count if count > 0 else 50  # Default neutral score
    overall_sentiment_summary = generate_overall_summary(average_score)

    # Write the summary to the output file
    with open(output_file_path, 'w') as output_file:
        output_file.write("Overall Sentiment Summary:\n")
        output_file.write(overall_sentiment_summary)

# Generate overall sentiment summary
def generate_overall_summary(average_score):
    if average_score >= 75:
        overall_sentiment = "Highly Positive"
        description = (
            "The overall responses reflect a highly positive sentiment, indicating great optimism and satisfaction. "
            "Keep up the excellent work and maintain this emotional outlook."
        )
    elif average_score >= 55:
        overall_sentiment = "Positive"
        description = (
            "The overall responses suggest a generally positive sentiment. "
            "Some areas could improve, but the outlook is overall optimistic."
        )
    elif average_score >= 35:
        overall_sentiment = "Neutral"
        description = (
            "The overall responses reflect a balanced sentiment with room for improvement. "
            "Consider focusing on areas that could enhance positivity."
        )
    else:
        overall_sentiment = "Negative"
        description = (
            "The overall responses convey a predominantly negative sentiment, indicating dissatisfaction or challenges. "
            "Address the key areas of concern to improve emotional well-being and outlook."
        )

    return f"Overall Sentiment: {overall_sentiment}\n" \
           f"Score: {int(average_score)} / 100\n" \
           f"{description}\n"

# Main function
def main():
    input_file = "data/input.txt"  # Input file with responses
    output_file = "output/result.txt"  # Output file for results

    # Ensure the output folder exists
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    # Configure the API and perform analysis
    configure_api()
    perform_sentiment_analysis(input_file, output_file)

if __name__ == "__main__":
    main()
