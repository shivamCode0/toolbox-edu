from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from api import evaluate_essay, generate_assessment, generate_lesson_plan

app = Flask(__name__)
CORS(app)


@app.route("/essay", methods=["POST"])
def eval_essay_api():
    print("eval-essay-api")
    try:
        essay = request.form.get("essay")

        # Call the evaluate_essay function to assess the essay
        feedback, ratings, overall_score = evaluate_essay(essay)

        return jsonify({"feedback": feedback, "ratings": ratings, "overall_score": overall_score})

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/lessonplan", methods=["POST"])
def lessonplan():
    print("lessonplan")
    try:
        days = request.form.get("days")
        course_standards = request.form.get("course_standards")

        # Call the evaluate_essay function to assess the essay
        plan, text = generate_lesson_plan(days, course_standards)

        return jsonify({"plan": plan, "text": text})

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/assessment", methods=["POST"])
def generate_assessment_api():
    print("generate-assessment-api")
    try:
        test_content = request.form.get("test_content")
        num_questions = int(request.form.get("num_questions"))

        # Call the generate_assessment function to generate assessment questions
        assessment_questions = generate_assessment(test_content, num_questions)

        return jsonify({"assessment_questions": assessment_questions})

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
