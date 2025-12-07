import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            // redirigir al home después de login
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Iniciar sesión</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <label htmlFor="email" style={{ display: 'block', margin: '8px 0 4px' }}>Email *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '12px', boxSizing: 'border-box' }}
                />
                <label htmlFor="password" style={{ display: 'block', margin: '8px 0 4px' }}>Contraseña *</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '12px', boxSizing: 'border-box' }}
                />
                {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{error}</p>}
                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px', fontSize: '16px' }}>
                    {isLoading ? "Ingresando..." : "Logearse"}
                </button>
            </form>
        </div>
    );
};