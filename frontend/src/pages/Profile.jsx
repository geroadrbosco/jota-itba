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
        </div>)
}