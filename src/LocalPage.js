
import LoginPage from "./components/login";
import TemplateCards from "./components/templateCards";
import LocalNavHeader from "./components/localNavHeader";
import { useState, useEffect} from "react";
import RegisterPage from "./components/register";
import { useNavigate } from "react-router-dom";



const LocalPage = () => {

  const [copied, setCopied] = useState(false);
  const handleCopy = (formLink) => {
    navigator.clipboard.writeText(formLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied message after 2s
    });
  };

  const [activeLink, setActiveLink] = useState('home'); 
  const [forms, setForms] =useState([])
  const navigate = useNavigate();


      const [loading, setLoading] = useState(true); 
     
  
      // Fetch users
      const getForms = async () => {
          setLoading(true);
          try {
              const res = await fetch(`https://google-form-clone-wck5.onrender.com/getForms`);
              const jsRes = await res.json();
              setForms(jsRes);
          } catch (error) {
              console.error("Error fetching forms:", error);
          } finally {
              setLoading(false); 
          }
      };
  
      useEffect(() => { getForms(); }, []);



  return (

<div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
  {/* Header Navbar */}
  <LocalNavHeader 
        activeLink={activeLink} 
        setActiveLink={setActiveLink} 
        hidelogin={false}
        hideitem1={false}
        hideitem2={true}
        hideitem3={true}
        hidelogout={true}/>

  {/* Main Body */}
  <div
    className="container mt-5 pt-5 bg-light col-12 col-md-10 col-lg-10"
    style={{ minHeight: "100vh", paddingTop: "4rem" }}
  >
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-md-10">
        {/* Form Card */}


        {(<div className="card shadow-lg rounded">
          <div
            className="card-header text-white text-center"
            style={{ backgroundColor: "#B0817A" }}
          >
            <h4>{activeLink === "home" ? "Templates" : "About Section"}</h4>
          </div>
          <div className="card-body d-flex justify-content-center">
            { activeLink === "home" && <TemplateCards />}

            {activeLink === "about" && (<div className="card">
              <div className="card-body">
                <h5 className="card-title">FFA Form</h5>
                <p className="card-text fw-bold">
                  This is a clone google form made by Fahim Foysal Apurba.
                </p>
                <p className="card-text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum autem tenetur maxime pariatur reprehenderit alias quasi, dicta molestias assumenda labore, laudantium minima facilis perspiciatis? Optio nemo corrupti molestias reprehenderit quia facere veniam dolor veritatis repudiandae perferendis, ex recusandae laboriosam, aspernatur nam, fugiat ut minima est maiores inventore debitis provident? Eos excepturi soluta quibusdam alias incidunt hic cupiditate. Repellendus quibusdam officiis autem deleniti rerum aut, ex veniam quae quidem aliquam vero! Culpa sequi aperiam explicabo corrupti. Labore, pariatur qui accusantium natus odit ipsum at iusto quos omnis expedita est doloribus sed saepe iure excepturi necessitatibus provident minus quis unde adipisci earum.
                </p>
              </div>
            </div>)}
            
            
          </div>
        </div>)}
        
        <div className="mt-2 card shadow-lg rounded">
          <div
            className="card-header text-white text-center"
            style={{ backgroundColor: "#B0817A" }}
          >
            <h4>Forms</h4>
            </div>

            <div className="card-body ">

            <div className="table-responsive">  
                {loading ? (  
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "250px" }}>
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : forms.length === 0 ? (  
                    <div className="text-center text-muted my-4">
                        <h5>No forms found.</h5>
                    </div>
                ) : (  

            <table className="table table-bordered table-striped table-hover ">
                        <thead className="table-dark text-center">
                            <tr>
                                
                                <th>Title</th>
                                <th>Link of forms</th>
                                <th>Copy link</th>
                                
                                
                               
                            </tr>
                        </thead>
                        <tbody>

                        {forms.map((f)=>( <tr key={f.id}>
                          <td className="text-truncate" style={{ maxWidth: "130px" }}>{f.title}</td>
                    
                          <td> <button onClick={()=>navigate(`/answerPage/${f.id}`)}>{`ffa-form.netlify.app/answerPage/${f.id}`}</button></td>
                          <td>      <button onClick={()=>handleCopy(`ffa-form.netlify.app/answerPage/${f.id}`)}>
                                       {copied ? "Copied!" : "Copy Link"}
                                      </button></td>
                          
                        </tr> ))}
                          </tbody>
                          </table>)}
                          </div>
                          
            </div>
            </div>
        

        
      </div>
    </div>
  </div>

  {/* Login Modal */}
  <LoginPage />

  {/* Register Modal */}
  <RegisterPage />
</div>

  );
};

export default LocalPage;


