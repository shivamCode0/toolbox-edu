import openai
import re

# Set your OpenAI API key
api_key = "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"
api_key = "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"
openai.api_key = api_key


def evaluate_essay(essay):
    print(f"Evaluating essay:\n{essay}\n")
    categories = ["Grammar", "Structure", "Clarity", "Content"]
    feedback = {}
    for category in categories:
        response = openai.Completion.create(
            model="gpt-3.5-turbo-instruct",
            prompt=f"You will be provided an essay. Please provide feedback on {category} in the essay. \
First, give very concise feedback on the essay. Don't talk about general info, only the essay. \
Grade at a medium difficulty and be very concise. Max 3 sentences feedback. Only give feedback on {category}. \
Then, provide a score from 1 to 5. If there is no essay, give a score of 1. Make sure to give feedback \
first, then say 'Score: ' before the number.\n\nEssay: \n\{essay}\nEND OF ESSAY\nRemember, here are the instructions. Make sure to give feedback \
first, then say 'Score: ' before the number.\nFeedback: ",
            temperature=0.8,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
        )
        print(response)

        feedback[category] = response.choices[0].text

    ratings = {}
    for category, feedback_text in feedback.items():
        # Extract numerical ratings from the feedback using regular expressions
        rating_match = re.search(r"Score:\s(\d+(\.\d+)?)", feedback_text)
        if rating_match:
            rating = int(rating_match.group(1))
            ratings[category] = rating

            # remove the rating from the feedback text
            feedback[category] = feedback_text.replace(rating_match.group(0), "")
        else:
            # If a rating is not found, set a default rating
            ratings[category] = 0

    for category, feedback_text in feedback.items():
        print(f"{category}\n{feedback_text}\nScore: {ratings[category]}\n")

    # Calculate an overall score as an average of individual ratings
    overall_score = sum(ratings.values())
    print(f"Overall Score: {overall_score}")
    return feedback, ratings, overall_score
