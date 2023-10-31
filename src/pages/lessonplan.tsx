import { BACKEND_URL, chunk } from "src/util";
import React, { useState } from "react";

function jsonToFormData(jsonData: any) {
  const formData = new FormData();
  for (const key in jsonData) if (jsonData.hasOwnProperty(key)) formData.append(key, jsonData[key]);
  return formData;
}

export default function LessonPlanGenerator() {
  const [days, setDays] = useState(1);
  const [standards, setStandards] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function analyzePaper() {
    setLoading(true);
    fetch(`${BACKEND_URL}/lessonplan`, { method: "POST", body: jsonToFormData({ course_standards: standards, days }) })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="container-fluid mt-3">
      <h1 className="text-center">Lesson Plan Creator</h1>
      <div className="row mt-4">
        <div className="col-3"></div>
        <div className="col-md-6">
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="mb-2">
              {/* Number of Days */}
              <label htmlFor="days" className="form-label">
                How many days do you want to cover the standards?
              </label>
              <input type="number" className="form-control" id="days" value={days} disabled={loading} onChange={(e) => setDays(parseInt(e.target.value))} placeholder="Number of days" />
              <br />
              <label htmlFor="standards" className="form-label">
                Enter the standards you want to cover
              </label>
              <textarea
                //
                className="form-control"
                id="standards"
                rows={5}
                value={standards}
                disabled={loading}
                onChange={(e) => setStandards(e.target.value)}
                placeholder="Enter standards here"
              />
              <button className="btn btn-primary btn-lg w-100 mt-3" onClick={analyzePaper} disabled={loading}>
                Generate Lesson Plan
              </button>
            </div>
          )}
        </div>
        <div className="col-3"></div>
      </div>
      <div className="container">
        {result && (
          <table className="plantable">
            <tbody>
              {chunk(result.plan, 5)
                .map((row: string[][], i) => (row.length === 5 ? row : [...row, ...Array(5 - row.length).fill([])]))
                .map((row: string[][], i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ ...(cell.length === 0 && { border: "none" }) }}>
                        {cell.length > 0 && (
                          <>
                            <h5>Day {i * 5 + j + 1}</h5>
                            <ul>
                              {cell.map((line, k) => (
                                <li key={k}>{line}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
