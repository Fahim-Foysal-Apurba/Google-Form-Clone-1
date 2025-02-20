import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const AdminHome = () => {
    const location = useLocation();
    const id= location.state?.id;
    const name = location.state?.name;
    const email = location.state?.email;
    const mode =location.state?.mode;
    const role = location.state?.role;
    useEffect(() => {
        document.body.classList.remove('modal-open');
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());
    }, []);

    return (
        <div >
            <h1>id: {id}</h1>
            <h1>Welcome, {name}!</h1>
            <h1>{email}</h1>
            <h1>role: {role}</h1>
            {!mode && <h1>mode: Light</h1>}
            {mode && <h1>mode: Dark </h1>}
        </div>
    );
};

export default AdminHome;