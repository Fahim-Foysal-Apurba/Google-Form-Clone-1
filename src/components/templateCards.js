import customTemImg from '../image/layout.png';
const TemplateCards = () => {
    return (
<div
  className="card shadow-lg bg-light rounded border border-light"
  style={{
    width: "100%", // Makes it flexible and responsive
    maxWidth: "200px", // Maximum width for larger screens
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
  <a href="/" className="d-flex justify-content-center">
    <img
      src={customTemImg}
      className="card-img-top p-3"
      style={{
        width: "100%",
        maxWidth: "140px", // Ensures it scales well on small screens
        height: "140px",
        objectFit: "cover", // Ensures the image scales properly
      }}
      alt="custom template"
    />
  </a>
  <div
    className="card-body text-center"
    style={{
      width: "100%",
      height: "auto", // Removed fixed height
    }}
  >
    <h5 className="card-title" style={{ fontSize: "16px" }}> {/* Reduced font size for better fit */}
      Custom Template
    </h5>
  </div>
</div>

    );
  };
  

  
 
export default TemplateCards;