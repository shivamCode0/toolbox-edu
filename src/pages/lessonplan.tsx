import { BACKEND_URL } from "src/util";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

function jsonToFormData(jsonData: any) {
  const formData = new FormData();
  for (const key in jsonData) if (jsonData.hasOwnProperty(key)) formData.append(key, jsonData[key]);
  return formData;
}

export default function LessonPlanGenerator() {
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function analyzePaper() {
    setLoading(true);
    fetch(`${BACKEND_URL}/lessonplan`, {
      method: "POST",
      // body is formData
      body: jsonToFormData({ essay }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // alert(`Grade: ${data.grade}\n\n${data.message}`);
        setResult(data);
      })
      .finally(() => {
        setLoading(false);
        // setEssay("");
      });
  }

  return (
    <div className="container-fluid mt-3">
      <h1 className="text-center">Lesson Plan Creator</h1>
      <div className="row mt-4">
        <div className="col-md-6">
          <label htmlFor="standards" className="form-label">
            Enter the standards you want to cover
          </label>
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <textarea className="form-control" id="standards" rows={10} value={essay} disabled={loading} onChange={(e) => setEssay(e.target.value)} placeholder="Paste paper here" />
          )}
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary btn-lg w-100" onClick={analyzePaper} disabled={loading}>
            Analyze Paper
          </button>
          {result && (
            // feedback. first overall score then subscores with feedback for each category
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
