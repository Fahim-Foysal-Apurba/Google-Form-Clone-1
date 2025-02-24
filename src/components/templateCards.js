import customTemImg from '../image/layout.png';
import FormTem from './form.js';



const TemplateCards = ({ id, email, name, role, mode, setMode }) => {




    return (
      <div className="card">
<div
  className="card shadow-lg bg-light rounded border border-light"
  style={{
    width: "100%", 
    maxWidth: "200px", 
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  }}
>
  <button className='btn btn-otline-light d-flex justify-content-center '>
     <div className='p-1'>
    <img
      src={customTemImg}
      className="card-img-top p-3"
      style={{
        width: "100%",
        maxWidth: "140px", // Ensures it scales well on small screens
        height: "140px",
        objectFit: "cover", // Ensures the image scales properly
      }}
        data-bs-toggle="modal"
        data-bs-target="#formModal"
      alt="custom template"
    />
    
    
    
 
  
  <div
    className="card-body text-center"
    style={{
      width: "100%",
      height: "auto", // Removed fixed height
    }}
  >

    <h5 className="card-title" style={{ fontSize: "16px" }}> {/* Reduced font size for better fit */}
      Create Form
    </h5>
  </div>
  </div>
  </button>
  </div>
  

<FormTem id={id} name={name} email={email} role={role} mode={mode} setMode={setMode} />




</div>



    );
  };
  

  
 
export default TemplateCards;






