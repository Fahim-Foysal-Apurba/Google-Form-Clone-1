import {useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';



const GetUsers = ({id, name, mode}) => {
    

    const navigate=useNavigate()
    const [loading, setLoading] = useState(true); 


    const [userInfo, setUserInfo]=useState([])
    const [ids, setIds] = useState([])
    const [selectedItems, setSelectedItems]= useState([])

    const getData = async () => {
      try {
        setLoading(true)
          const response = await fetch('http://localhost:5000/getUsers');
  
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          setUserInfo(data);
  
          const idsArray = data.map(user => user.id);
          setIds(idsArray);

          
      } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false)
      }finally{
        setLoading(false)
      }
  };
  
  useEffect(() => {
      getData();
  }, []);
  

  const deleteSelection= async (e)=>{
    e.preventDefault()
      const body={selectedItems}
     const response=await fetch('http://localhost:5000/deleteUser',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)

      })
      if(response.ok){
        getData()
        if(selectedItems.includes(id)){
          handlelogout()
        }
        setSelectedItems([])
      }
  }

  const blockUser= async(e)=>{
    e.preventDefault()

    const body={selectedItems}

    const response=await fetch('http://localhost:5000/blockUser',{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(body)
  })

  if(response.ok){
    getData()
    if(selectedItems.includes(id)){
      handlelogout()
    }
    setSelectedItems([])
  }

  }

  const unblockUser= async(e)=>{
    e.preventDefault()

    const body={selectedItems}

    const response=await fetch('https://google-form-clone-wck5.onrender.com/unBlockUser',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })

    if(response.ok){
      getData()
      setSelectedItems([])
    }
  }

  const addAdmin= async(e)=>{
    e.preventDefault()

    const body={selectedItems}

    const response=await fetch('https://google-form-clone-wck5.onrender.com/addAdmin',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })

    if(response.ok){
      getData()
      setSelectedItems([])
    }
  }


  const removeAdmin= async(e)=>{
    e.preventDefault()

    const body={selectedItems}

    const response=await fetch('https://google-form-clone-wck5.onrender.com/removeAdmin',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })

    if(response.ok){
      getData()
      if(selectedItems.includes(id)){
        handlelogout()
      }
      setSelectedItems([])
    }
  }

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item) 
        : [...prevSelected, item] 
    );
  };

  const handleCheckboxChangeAll=()=>{
 
      setSelectedItems(selectedItems.length === ids.length ? [] : [...ids]);

  }


  const getTimeAgo = (isoTimestamp) => {
    const lastLoginTime = new Date(isoTimestamp); // Convert ISO string to Date object
    const now = new Date();
    const diffInMs = now - lastLoginTime; // Difference in milliseconds

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} days ago`;
};



   
    const handlelogout= async ()=>{

        const response= await fetch('https://google-form-clone-wck5.onrender.com/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if(response.status===200){
          navigate('/')
         // alert("Successfully Logout")

        }else{
            return alert("logout failed")
        }

    }

    





    return (
        <div className="container" style={{ padding: "0px", minWidth: "100%" }}>
    
            <div className="container w-100" style={{ backgroundColor: "#f9ecf2", minWidth: "100%" }}>
    
                <div className="container-fluid w-100 px-3 py-3 border border-3 rounded d-flex flex-wrap justify-content-between align-items-center" style={{ backgroundColor: "#e09ebd", minWidth: "100%" }}>
                    <div className="d-flex flex-wrap gap-2">
                        <button className={selectedItems.length === 0 ? "btn btn-danger btn-light disabled" : "btn btn-outline-danger btn-light"} onClick={deleteSelection}>
                            <i className="fa fa-trash"></i>
                        </button>
                        <button className={selectedItems.length === 0 ? "btn btn-warning btn-light disabled" : "btn btn-outline-warning btn-light"} onClick={blockUser}>
                            <i className="fa fa-lock"></i>
                        </button>
                        <button className={selectedItems.length === 0 ? "btn btn-success btn-light disabled" : "btn btn-outline-success btn-light"} onClick={unblockUser}>
                            <i className="fas fa-lock-open"></i>
                        </button>
                        <button className={selectedItems.length === 0 ? "btn btn-info btn-light disabled" : "btn btn-outline-info btn-light"} onClick={addAdmin}>
                            <i className="fas fa-user-plus"></i>
                        </button>
                        <button className={selectedItems.length === 0 ? "btn btn-primary btn-light disabled" : "btn btn-outline-primary btn-light"} onClick={removeAdmin}>
                            <i className="fas fa-user-minus"></i>
                        </button>
                    </div>
                </div>
    
                {/* Table User */}
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "250px" }}>
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : userInfo.length === 0 ? (
                    <div className="text-center text-muted my-4">
                        <h5>No users found.</h5>
                    </div>
                ) : (
                    <table className="table table-striped table-hover my-2 border border-3 rounded">
                        <thead className="table-dark">
                            <tr>
                                <th>
                                    <input type="checkbox" checked={selectedItems.length === ids.length} onChange={handleCheckboxChangeAll} />
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Last Login</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userInfo.map((u) => (
                                <tr key={u.id} className={u.status === "blocked" ? "text-muted bg-white" : ""}>
                                    <td>
                                        <input type="checkbox" checked={selectedItems.includes(u.id)} onChange={() => handleCheckboxChange(u.id)} />
                                    </td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>{getTimeAgo(u.updated_at)}</td>
                                    <td className={u.block_status === true ? "text-success" : "text-danger"}>
                                        {u.block_status ? "Blocked" : "Active"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
    
}
 
export default GetUsers;



