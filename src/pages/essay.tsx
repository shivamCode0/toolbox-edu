import { BACKEND_URL } from "src/util";
import React, { useState } from "react";

function jsonToFormData(jsonData: any) {
  const formData = new FormData();
  for (const key in jsonData) if (jsonData.hasOwnProperty(key)) formData.append(key, jsonData[key]);
  return formData;
}

type Category = "Clarity" | "Content" | "Grammar" | "Structure";
type Evaluation = {
  feedback: {
    [key in Category]: string;
  };
  ratings: { [key in Category]: number };
  overall_score: number;
};

export default function EssayGrading() {
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation>(null);

  function analyzePaper() {
    setLoading(true);
    fetch(`${BACKEND_URL}/essay`, {
      method: "POST",
      // body is formData
      body: jsonToFormData({ essay }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // alert(`Grade: ${data.grade}\n\n${data.message}`);
        setEvaluation(data);
      })
      .finally(() => {
        setLoading(false);
        // setEssay("");
      });
  }

  return (
    <div className="container-fluid mt-3">
      <h1 className="text-center">AI Writing Evaluator</h1>
      <div className="row mt-4">
        <div className="col-md-7">
          <label htmlFor="essay" className="form-label">
            Paste the student's paper here
          </label>
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <textarea className="form-control" id="essay" rows={10} value={essay} disabled={loading} onChange={(e) => setEssay(e.target.value)} placeholder="Paste paper here" />
          )}
        </div>
        <div className="col-md-5">
          <button className="btn btn-primary btn-lg w-100" onClick={analyzePaper} disabled={loading}>
            Analyze Paper
          </button>
          {evaluation && (
            // feedback. first overall score then subscores with feedback for each category
            <>
              <hr />
              <h2 className="text-center">Feedback</h2>
              <h3>Overall Score: {evaluation.overall_score} / 20</h3>
              {Object.entries(evaluation.ratings).map(([category, score]) => (
                <div key={category}>
                  <h4>
                    {category}: {score}
                  </h4>
                  <p style={{ whiteSpace: "pre-wrap" }}>{evaluation.feedback[category as Category].trim()}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
