import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AnswerForm = () => {
  const { id } = useParams(); // Get form ID from URL
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // To show success/error message after submission
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`https://google-form-clone-wck5.onrender.com/forms/${id}`);
        if (!response.ok) {
          throw new Error("Failed to load form");
        }
        const data = await response.json();
        setForm(data);
        setLoading(false);

        // Initialize answers state
        const initialAnswers = {};
        data.questions.forEach((q) => {
          initialAnswers[q.id] = q.type === "multiple-choice" ? "" : "";
        });
        setAnswers(initialAnswers);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://google-form-clone-wck5.onrender.com/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_id: id,
          answers: Object.keys(answers).map((questionId) => ({
            questionId,
            answer: answers[questionId],
          })),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message); // Set success message
      } else {
        const result = await response.json();
        setMessage(result.error); // Set error message
      }
    } catch (err) {
      setMessage("Error submitting answers");
      console.error(err);
    }
  };

  // Handle navigation back to the previous page
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) return <p>Loading form...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!form) return <p>No form data</p>;

  return (
    <div className="container d-flex justify-content-center" style={{backgroundColor: "#B0817A" }}>
    <div className="container mt-4" >
      <div className="card shadow">

        <div className="card-header d-flex justify-content-center">

          <h2>{form.form.title}</h2>
        </div>
        <div className="card-body">
          {form.questions.map((q) => (
            <div key={q.id} className="my-2 p-2 border rounded">
              <p className="fw-bold">{q.que}</p>
              {q.type === "text" ? (
                <input
                  type="text"
                  className="form-control"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ) : (
                <div>
                  {q.options.map((opt, index) => (
                    <div key={index} className="form-check">
                      <input
                        type="radio"
                        name={`question-${q.id}`} // Ensures only one selection per question
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        className="form-check-input"
                      />
                      <label className="form-check-label">{opt}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit Answers
          </button>
          {message && (
            <div className="mt-3">
              <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}>
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
      <button className="btn btn-secondary my-3" onClick={handleBack}>
            Back
          </button>
    </div>

    </div>
  );
};

export default AnswerForm;


