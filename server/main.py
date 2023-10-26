from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from api import evaluate_essay

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


if __name__ == "__main__":
    app.run(debug=True)
