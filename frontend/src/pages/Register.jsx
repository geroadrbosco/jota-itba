import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

export const Register = () => {
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    
const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register(formData.email, formData.password);
            toast.success("Usuario registrado exitosamente");
            navigate("/login");
        } catch (err) {
            console.error("Error al registrar usuario", err);
            setError(err.message);
            toast.error(err.message);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '100vh'}}>
    
            <h2>Crear cuenta</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Contraseña *</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrarse"}
                </button>
            </form>
        </div>
    );
};
