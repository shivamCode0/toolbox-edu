import openai
import re

# Set your OpenAI API key
api_key = "sk-gvtddc0djc73piJ0DjJ8fjeH39D43hfJ84C8nv84"  # not a real key for my video
openai.api_key = api_key


def evaluate_essay(essay):
    # trim the essay to 4000 characters
    essay = essay[:4000]

    print(f"Evaluating essay:\n{essay}\n")
    categories = ["Grammar", "Structure", "Clarity", "Content"]
    feedback = {}
    for category in categories:
        response = openai.Completion.create(
            model="gpt-3.5-turbo-instruct",
            prompt=f"You will be provided an essay. Please provide feedback on {category} in the essay. \
First, give very concise feedback on the essay. Don't talk about general info, only the essay. \
Grade at a medium easy difficulty but give points where possible and be very concise. Max 3 sentences feedback. Only give feedback on {category}. \
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
            rating = float(rating_match.group(1))
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


def generate_lesson_plan(days: int, course_standards: str) -> list[list[str]]:
    lesson_plan = []

    prompt = f"""Generate a lesson plan for a {days}-day course based on the following course standards:
{course_standards}
END OF STANDARDS
Output your lesson plan like the following example structure:
```
Lesson Plan:
Day 1
- Intro to Limits
- Limit Notation
- Direct Substitution


Day 2
- Limits by Factoring
- Continuity & Removable Discontinuities
- Rational Functions

Day 3
- Implicit Differentiation
- L'Hopital's rule
- Limits (Unit 1) Test Review
```

In other words, Say "Day N" and then 2 to 4 short bullet points like the ones above for each day. Make sure to include the "Day N" part. \
Then, skip a line and start the next day. Do not use the example above, generate your own lesson plan. \
Keep going until you fill all the {days} days.\

Lesson Plan:
"""
    print(prompt)
    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=3000,  # You may need to adjust the max_tokens based on the response length.
    )

    plan_text = response.choices[0].text.strip()

    print(plan_text)

    def parse_lesson_plan(lesson_plan_text):
        lesson_plan = []
        day_lines = lesson_plan_text.split("\n\n")

        for day_text in day_lines:
            day_lines = day_text.strip().split("\n")
            day_bullet_points = [line.strip("- ").strip() for line in day_lines[1:]]
            lesson_plan.append(day_bullet_points)

        return lesson_plan

    plan_formatted = parse_lesson_plan(plan_text)

    return plan_formatted, plan_text


import openai


def generate_assessment(test_content, num_questions):
    """
    Generate assessment questions based on a test.

    Parameters:
        test_content (str): The content of the test for which you want to generate questions.
        num_questions (int): The number of questions to generate.

    Returns:
        list[str]: A list of generated assessment questions.
    """
    questions = []

    prompt = f"""Generate {num_questions} assessment questions based on the following test content:
{test_content}
END OF TEST CONTENT
Generate questions in the following format (HTML required):
```
1. What is the capital of France?
A) Berlin
B) London
C) Paris
D) Madrid
Correct Answer: C

2. What is the capital of Germany?
A) Berlin
B) London
C) Paris
D) Madrid
Correct Answer: A
```

Your questions should be multiple-choice and provide the correct answer. You can vary the format and type of questions.
"""

    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=1000,
    )
    print(response.choices[0].text)

    def split_multiple_choice(text):
        # Split the text into individual questions using regular expression
        questions = re.split(r"\d+\.", text)

        # Initialize a list to store the tuples
        result = []

        # Loop through each question
        for question in questions:
            # Skip empty strings
            if not question.strip():
                continue

            # Initialize variables to store question, choices, and correct answer
            question_text = None
            choices = []
            correct_answer = None

            # Split the question into lines
            lines = question.strip().split("\n")

            # Extract the question text (first line)
            question_text = lines[0].strip()

            # Extract choices (lines 1 to second-to-last line)
            for line in lines[1:-1]:
                choice_match = re.match(r"([A-D]\) )", line)
                if choice_match:
                    choices.append(choice_match.group(1) + line[3:].strip())

            # Extract the correct answer (last line)
            correct_match = re.search(r"Correct Answer: ([A-D])", lines[-1])
            if correct_match:
                correct_answer = correct_match.group(1)

            # Add the extracted information as a tuple to the result list
            result.append((question_text, choices, correct_answer))

        return result

    questions = split_multiple_choice(response.choices[0].text)

    return questions
