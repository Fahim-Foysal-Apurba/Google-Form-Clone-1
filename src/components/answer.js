import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AnswerForm = () => {
  const { id } = useParams(); 
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();
  const [email, setEmail]=useState('')
  const [user_name, setName]=useState('')
  const [password, setPassword]=useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://google-form-clone-wck5.onrender.com/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user_name,
          email: email,
          password: password,
          form_id: id,
          answers: Object.keys(answers).map((questionId) => ({
            questionId,
            answer: answers[questionId],
          })),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message); 

        setAnswers({})
        setEmail('')
        setName('')
        setPassword('')
      } else {
        const result = await response.json();
        setMessage(result.error); 
      }
    } catch (err) {
      setMessage("Error submitting answers");
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  if (loading) return <p>Loading form...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!form) return <p>No form data</p>;

  return (
    <div className="container d-flex justify-content-center" style={{backgroundColor: "#f9ecf2" }}>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header d-flex justify-content-center">
            <h2>{form.form.title}</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {form.questions.map((q) => (
                <div key={q.id} className="my-2 p-2 border rounded">
                  <p className="fw-bold">{q.que}</p>
                  {q.type === "text" ? (
                    <input
                      type="text"
                      className="form-control"
                      value={answers[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      required
                    />
                  ) : (
                    <div className="d-flex justify-content-center align-item-center flex-column">
                      {q.options.map((opt, index) => (
                        <div key={index} className="form-check">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={opt}
                            checked={answers[q.id] === opt}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                            className="form-check-input"
                            required
                          />
                          <label className="form-check-label">{opt}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
               


            <div className="w-50 container-fluid my-4" style={{backgroundColor: "#f9ecf2"}}>

              {/*user register */}
              
              <div className="mb-3">
                                <label htmlFor="user_name" className="form-label fw-bold">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="user_name"
                                    value={user_name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="mb-3 pb-3">
                                <label htmlFor="password" className="form-label fw-bold">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

            <button className="btn btn-outline-success mt-4" type="submit">
                Submit Answers
              </button>
            </form>
            {message && (
              <div className="mt-3">
                <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}>
                  {message}
                </div>
              </div>
            )}




          </div>
        </div>
        <button className="btn btn-secondary my-3 d-flex" onClick={handleBack}>
          <i className="fa fa-arrow-circle-left"></i>
        </button>
      </div>
    </div>
  );
};

export default AnswerForm;


