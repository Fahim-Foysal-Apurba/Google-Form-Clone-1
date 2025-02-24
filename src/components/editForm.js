import React, { useState, useEffect } from "react";

const EditForm = ({ id, form_id }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch the existing form data
    const fetchForm = async () => {
      try {
        const response = await fetch(`https://google-form-clone-wck5.onrender.com/forms/${form_id}`);
        const data = await response.json();
        if (response.ok) {
          setTitle(data.form.title);
          setQuestions(data.questions);
        } else {
          alert("Error fetching form details");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching form details");
      }
    };

    fetchForm();
  }, [form_id]);

  // Update question data
  const updateQuestion = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  // Handle form update
  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://google-form-clone-wck5.onrender.com/forms/${form_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, questions }),
      });

      if (response.ok) {
        alert("Form Updated Successfully!");
      } else {
        alert("Error updating form");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating form");
    }
  };

  return (
    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-warning">
            <h5 className="modal-title w-100" id="editModalLabel">Edit Form</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <label htmlFor="title" className="fw-bold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control my-2"
            />

            {questions.map((q, index) => (
              <div key={index} className="my-2 p-2 border rounded">
                <input
                  type="text"
                  value={q.que}
                  onChange={(e) => updateQuestion(index, "que", e.target.value)}
                  className="form-control"
                />
                <select
                  value={q.type}
                  onChange={(e) => updateQuestion(index, "type", e.target.value)}
                  className="form-control my-2"
                >
                  <option value="text">Text</option>
                  <option value="multiple-choice">Multiple Choice</option>
                </select>

                {q.type === "multiple-choice" && q.options && (
                  <div className="mt-2">
                    {q.options.map((opt, oIndex) => (
                      <input
                        key={oIndex}
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].options[oIndex] = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                        className="form-control my-1"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button onClick={handleUpdate} className="btn btn-primary w-100" data-bs-dismiss="modal">
              Update Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
