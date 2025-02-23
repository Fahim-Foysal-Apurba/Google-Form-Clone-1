import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const [email1, setEmail1] = useState('')
    const [password1, setPassword1] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = async (e) =>  {
      e.preventDefault();
      const body = { email1, password1};
      setLoading(true);

      try {
          const response = await fetch("https://google-form-clone-wck5.onrender.com/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
          });

          const data = await response.json();

          if (response.status === 404 || response.status === 401 || response.status === 403) {
              setErrorMessage(data.message);
          } 
          else if(response.status === 200){
            //redirect to adminPage or userpage
              navigate('/adminPage', { state: {id: data.user.id, name: data.user.name, email: data.user.email, mode: data.user.mode, role: data.user.role } });
          }
      } catch (err) {
          console.error(err.message);
          setLoading(false); 
      }finally {
        setLoading(false); // Stop loading
    }
      setEmail1('');
      setPassword1('');
      };


    return ( 

<div
className="modal fade"
id="loginModal"
tabIndex="-1"
aria-labelledby="loginModalLabel"
aria-hidden="true"
>
<div className="modal-dialog d-flex justify-content-center align-items-center vh-100">
  <div className="modal-content">
    <div className="modal-header w-100" style={{backgroundColor: "#C4B1AE"}}>
      <h5 className="modal-title text-center" id="loginModalLabel">
        Login
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div className="modal-body">
      <form onSubmit={handleLoginSubmit} >
        <div className="mb-3">
          <label htmlFor="email1" className="form-label">
             Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email1"
            value={email1}
            onChange={(e) => setEmail1(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div >

        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
       
        <button type="submit" className="btn btn-outline-dark w-25" style={{ backgroundColor: "#C4B1AE" }} disabled={loading}>{loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2"></span>
      Logging in...
    </>
  ) : (
    "Login"
  )}
        </button>
      </form>
    </div>
  </div>
</div>
</div>

     );
}
 
export default LoginPage;