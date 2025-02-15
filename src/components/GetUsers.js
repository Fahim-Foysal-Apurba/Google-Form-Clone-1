import { useState, useEffect, Fragment } from 'react';

const GetUsers = () => {

    const [user, setUser]= useState([]);

    const getData= async()=>{
         const res=await fetch(`https://google-form-clone-ioet.onrender.com/getUsers`)
         const jsRes=await res.json();

         setUser(jsRes);
    }
    useEffect(()=>{getData()}, [])


    return (
        <Fragment>
  <div className="container">
  <h2 className="table mt-5">User Table</h2> 
  <table className="table mt-5">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Created at</th>
        <th>Role</th>
       
      </tr>
    </thead>
    <tbody>
        {
            user.map((u)=>(
                <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.password}</td>
                <td>{u.created_at}</td>
                <td>{u.role}</td>
              </tr> 
            ))
        }
      
    </tbody>
  </table>
</div>
        </Fragment>
     );
}
 
export default GetUsers;