import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Profile = () => {

    const { user } = useAuth();

    return (<div style={{
        paddingTop: '100px',
        paddingLeft: '20px',
        paddingRight: '20px',
        minHeight: '100vh'
    }}>
        <h1> Bienvenido {user?.email} </h1>
        <NavLink
            to="/Pedidos"
            className={({ isActive }) =>
                `nav-link bg-white rounded-3 px-3 py-2 ${isActive ? 'active fw-bold' : ''}`
            }
        >
            Mis pedidos
        </NavLink>
    </div>)
}