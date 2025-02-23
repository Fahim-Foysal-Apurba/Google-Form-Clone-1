import { useState, useEffect } from 'react';

const GetUsers = ({id, name, mode}) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true); 
   

    // Fetch users
    const getData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://google-form-clone-wck5.onrender.com/getUsers`);
            const jsRes = await res.json();
            setUser(jsRes);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => { getData(); }, []);

    // Actions
    const deleteId = async (id) => {
        await fetch(`https://google-form-clone-wck5.onrender.com/delete/${id}`, { method: 'DELETE' });
        setUser(user.filter((x) => x.id !== id));
    };
    const blockId = async (id) => {
        await fetch(`https://google-form-clone-wck5.onrender.com/block/${id}`, { method: 'PUT' });
        setUser(user.map((x) => x.id === id ? { ...x, block_status: true } : x));
    };
    const unblockId = async (id) => {
        await fetch(`https://google-form-clone-wck5.onrender.com/unblock/${id}`, { method: 'PUT' });
        setUser(user.map((x) => x.id === id ? { ...x, block_status: false } : x));
    };
    const addAdmin = async (id) => {
        await fetch(`https://google-form-clone-wck5.onrender.com/addAdmin/${id}`, { method: 'PUT' });
        setUser(user.map((x) => x.id === id ? { ...x, role: "admin" } : x));
    };
    const removeAdmin = async (id) => {
        await fetch(`https://google-form-clone-wck5.onrender.com/removeAdmin/${id}`, { method: 'PUT' });
        setUser(user.map((x) => x.id === id ? { ...x, role: "user" } : x));
    };

    return (
        <div className="container mt-1">
            <div className="table-responsive">  
                {loading ? (  
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "250px" }}>
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : user.length === 0 ? (  
                    <div className="text-center text-muted my-4">
                        <h5>No users found.</h5>
                    </div>
                ) : (  
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Add Admin</th>
                                <th>Blocking</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((u) => (
                                <tr key={u.id} className="text-center">
                                    <td>{u.name}</td>
                                    <td className="text-truncate" style={{ maxWidth: "130px" }}>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td className={u.block_status ? "text-danger" : "text-success"}>
                                        {u.block_status ? "Blocked" : "Active"}
                                    </td>
                                    <td>
                                        {u.role === "admin" ? (
                                            <button className="btn btn-secondary btn-sm w-100 mb-1" onClick={() => removeAdmin(u.id)}>Remove</button>
                                        ) : (
                                            <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => addAdmin(u.id)}>Add</button>
                                        )}
                                    </td>
                                    <td>
                                        {u.block_status ? (
                                            <button className="btn btn-success btn-sm w-100 mb-1" onClick={() => unblockId(u.id)}>Unblock</button>
                                        ) : (
                                            <button className="btn btn-warning btn-sm w-100 mb-1" onClick={() => blockId(u.id)}>Block</button>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm w-100" onClick={() => deleteId(u.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default GetUsers;



