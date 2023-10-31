import { BACKEND_URL } from "src/util";
import React, { useState } from "react";

function jsonToFormData(jsonData: any) {
  const formData = new FormData();
  for (const key in jsonData) if (jsonData.hasOwnProperty(key)) formData.append(key, jsonData[key]);
  return formData;
}

export default function AssessmentQuestionGenerator() {
  const [testContent, setTestContent] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  function generateQuestions() {
    setLoading(true);
    fetch(`${BACKEND_URL}/assessment`, {
      method: "POST",
      body: jsonToFormData({ test_content: testContent, num_questions: numQuestions }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data.assessment_questions);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="container-fluid mt-3">
      <h1 className="text-center">Assessment Question Generator</h1>
      <div className="row mt-4">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="testContent" className="form-label">
                Enter the test content for question generation
              </label>
              <textarea
                className="form-control"
                id="testContent"
                rows={10}
                value={testContent}
                disabled={loading}
                onChange={(e) => setTestContent(e.target.value)}
                placeholder="Enter test content here"
              />
              <br />
              <label htmlFor="numQuestions" className="form-label">
                Number of questions to generate
              </label>
              <input
                type="number"
                className="form-control"
                id="numQuestions"
                value={numQuestions}
                disabled={loading}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                placeholder="Number of questions"
              />
              <button className="btn btn-primary btn-lg w-100 mt-3" onClick={generateQuestions} disabled={loading}>
                Generate Questions
              </button>

              {questions.length > 0 && (
                <div style={{ fontSize: ".85em" }}>
                  <hr />
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                      <h2 className="text-center">Generated Questions</h2>
                      <div>
                        {questions.map(([q, choices, correct]: [string, string[], "A" | "B" | "C" | "D"], i) => (
                          <div>
                            <p style={{ fontWeight: "bold" }}>
                              {i + 1}. {q}
                            </p>
                            {choices.map((choice, j) => (
                              <p>{choice}</p>
                            ))}
                          </div>
                        ))}
                      </div>
                      <h6 className="text-center fw-bold">Answers:</h6>

                      {questions.map(([q, choices, correct]: [string, string[], "A" | "B" | "C" | "D"], i) => (
                        <p className="mb-0">
                          {i + 1}. {correct}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {/* <div className="col-md-5"></div> */}
      </div>
    </div>
  );
}
