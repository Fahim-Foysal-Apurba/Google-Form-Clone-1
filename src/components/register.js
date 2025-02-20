import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const body = { user_name, email, password };

        try {
            const response = await fetch("https://google-form-clone-wck5.onrender.com/addUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (response.status === 400) {
                // Handle "Email exists" error
                setErrorMessage(data.message);
            } else if (response.status === 201) {
        

                // Redirect to user page on success
                navigate('/userPage', { state: {id: data.user.id, name: data.user.name, email: data.user.email, mode: data.user.mode, role: data.user.role } });
            }
        } catch (err) {
            console.error(err.message);
        }

        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div
            className="modal fade"
            id="registerModal"
            tabIndex="-1"
            aria-labelledby="registerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog d-flex justify-content-center align-items-center vh-100">
                <div className="modal-content">
                    <div className="modal-header justify-content-center w-100" style={{ backgroundColor: "#C4B1AE" }}>
                        <h5 className="modal-title" id="registerModalLabel">Register</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={onSubmitForm}>
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

                            <div className="mb-3">
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

                            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                            <button
                                type="submit"
                                className="btn btn-outline-dark w-25"
                                style={{ backgroundColor: "#C4B1AE" }}
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
