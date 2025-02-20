import customTemImg from '../image/layout.png';
const TemplateCards = () => {
    return (
      <div
        className="card shadow-lg bg-light rounded border border-light"
        style={{
          width: "200px",
          height: "220px", // Fix typo 'hight' to 'height'
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
        <a href="/">
          <img
            src={customTemImg}
            className="card-img-top p-3 m-3"
            style={{ width: "140px", height: "140px" }}
            alt="custom template"
          />
        </a>
        <div
          className="card-body"
          style={{
            width: "200px",
            height: "120px", // Fix typo 'hight' to 'height'
          }}
        >
          <h5 className="card-title" style={{ fontSize: "18px" }}>
            Custom template
          </h5>
        </div>
      </div>
    );
  };
  

  
 
export default TemplateCards;