import re


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


# Test the function with your example text
example_text = """
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
"""

questions = split_multiple_choice(example_text)

import json

print(json.dumps(questions, indent=4))
