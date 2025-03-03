import React, { useState } from "react";

const FormTem = ({ id, email, name, role, mode, setMode, getForms }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ que: "", type: "text", options: [] }]);
  const c = mode ? "bg-secondary text-light" : "bg-light";
  const [message, setMessage]=useState('')

  const addQuestion = () => {
    setQuestions([...questions, { que: "", type: "text", options: [] }]);
  };

  const updateQuestion = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://google-form-clone-wck5.onrender.com/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, questions, id }),
      });

      if (response.ok) {
      
        //document.body.classList.remove("modal-open");
        //document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
        getForms(id)
        setMessage("Form Created successfully")
        setTitle('')
        setQuestions([])
      } else {
        alert("Error creating form");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating form");
    }
  };

  return (
    <div className="container">
      <div className="modal fade" id="formModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl d-flex justify-content-center align-items-center vh-100  modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between w-100" style={{ backgroundColor: "#C4B1AE" }}>
              <h5 className="modal-title">FFA Form</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className={`modal-body ${c}`}>
              <form onSubmit={handleSubmit} className="p-3">
                <label htmlFor="title" className="fw-bold">Title</label>
                <input
                  type="text"
                  placeholder="Form Title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control form-control-lg my-2"
                  required
                />
                {questions.map((q, index) => (
                  <div key={index} className="my-2 p-2 border rounded">
                    <div className="d-flex align-items-center">
                      <input
                        type="text"
                        placeholder="Question"
                        value={q.que}
                        onChange={(e) => updateQuestion(index, "que", e.target.value)}
                        className="form-control me-2"
                        required
                      />
                      <button
                        onClick={() => removeQuestion(index)}
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                      >
                        <i className="fa fa-remove" style={{fontSize: "24px"}}></i>
                      </button>
                    </div>
                    <select
                      value={q.type}
                      onChange={(e) => updateQuestion(index, "type", e.target.value)}
                      className="form-select mt-2"
                    >
                      <option value="text">Text</option>
                      <option value="multiple-choice">Multiple Choice</option>
                    </select>
                    {q.type === "multiple-choice" && (
                      <div className="mt-2">
                        {q.options.map((opt, oIndex) => (
                          <div key={oIndex} className="d-flex align-items-center my-1">
                            <input
                              type="text"
                              placeholder={`Option ${oIndex + 1}`}
                              value={opt}
                              onChange={(e) => updateOption(index, oIndex, e.target.value)}
                              className="form-control me-2"
                              required
                            />
                            <button
                              onClick={() => removeOption(index, oIndex)}
                              type="button"
                              className="btn btn-outline-secondary btn-sm"
                            >
                              <i className="fa fa-remove" style={{fontSize: "24px"}}></i>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addOption(index)}
                          type="button"
                          className="btn btn-info btn-sm mt-2"
                        >
                          + Add Option
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addQuestion} className="btn btn-info w-100 mb-3">
                  + Add Question
                </button>
                {id && (
                  <button type="submit" className="btn btn-success">
                    Create
                  </button>
                )}
                {!id && (
                  <p className="text-muted text-center mt-3">Please register or login to create a form.</p>
                )}
              </form>

              {message && (
              <div className="mt-3">
                <div className={ message ? "alert alert-success" : "alert alert-danger"}>
                  {message}
                </div>
              </div>
            )}

                 </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTem;



