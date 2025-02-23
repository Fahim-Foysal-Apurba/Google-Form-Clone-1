import React, { useState } from "react";

const FormTem = ({ id, email, name, role, mode, setMode }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ que: "", type: "text", options: [] }]);
  const c = mode===true?"bg-secondary text-light":"bg-light";

  // Add a new question
  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { que: "", type: "text", options: [] },
    ]);
  };

  // Update question data
  const updateQuestion = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new option for multiple-choice questions
  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push(""); // Add empty option
    setQuestions(updatedQuestions);
  };

  // Update an option's value for a multiple-choice question
  const updateOption = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Remove an option from a multiple-choice question
  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch("https://google-form-clone-wck5.onrender.com/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, questions, id }),
      });

      if (response.ok) {
        alert("Form Created Successfully!");
        document.body.classList.remove("modal-open");
        document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
        document.body.style.overflow = "auto"; 
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
      <div
        className="modal fade"
        id="formModal"
        tabIndex="-1"
        aria-labelledby="formModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl d-flex justify-content-center align-items-center vh-100">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center w-100" style={{ backgroundColor: "#C4B1AE" }}>
              <h5 className="modal-title w-100" id="formModalLabel">
                FFA Form
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className={`modal-body ${c}`}>
              <div className="p-0 max-w-lg mx-auto shadow-md rounded-lg">
                <h2 className="text-xl font-bold">Create a Form</h2>
                <label htmlFor="title" className="fw-bold">Title</label>
                <div className={`p-6 max-w-lg mx-auto shadow-md rounded-lg ${c}`}>
                  <input
                    type="text"
                    placeholder="Form Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded my-2 form-control form-control-lg"
                  />

                  {questions.map((q, index) => (
                    <div key={index} className="my-2 p-2 border rounded">
                      <input
                        type="text"
                        placeholder="Question"
                        value={q.que}
                        onChange={(e) => updateQuestion(index, "que", e.target.value)}
                        className="w-full p-2 border rounded form-control form-control-lg"
                      />
                      <select
                        value={q.type}
                        onChange={(e) => updateQuestion(index, "type", e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                      >
                        <option value="text">Text</option>
                        <option value="multiple-choice">Multiple Choice</option>
                      </select>

                      {q.type === "multiple-choice" && (
                        <div className="mt-2">
                          {q.options.map((opt, oIndex) => (
                            <div key={oIndex} className="d-flex justify-content-between">
                              <input
                                type="text"
                                placeholder={`Option ${oIndex + 1}`}
                                value={opt}
                                onChange={(e) => updateOption(index, oIndex, e.target.value)}
                                className="w-full p-2 border rounded my-1"
                              />
                              <button
                                onClick={() => removeOption(index, oIndex)}
                                className="btn btn-outline-light btn-secondary p-1 rounded"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addOption(index)}
                            className="btn btn-outline-light btn-secondary p-1 rounded"
                          >
                            + Add Option
                          </button>
                        </div>
                      )}
                    </div>
                  ))}

                  <button onClick={addQuestion} className="btn btn-outline-light btn-info w-100">
                    + Add Question
                  </button><br /><br />
                 { id && ( <button onClick={handleSubmit} className="btn btn-outline-light btn-success d-flex">
                    Submit Form
                  </button>)}
                  {!id && (<h5 className="my-4 text-muted"> You cannot create a form without being a registered user.
                    <br /> Plz register or login to create form.
                  </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTem;


