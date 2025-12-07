import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";

import "../../styles/navbar.css"
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const anchoImagen = 60;
    const { getTotalItems }  = useCart()
    const { isAuthenticated } = useAuth() 
    
    // Datos de ejemplo del usuario (después podrás reemplazarlos con datos reales)
    const usuario = {
        nombre: isAuthenticated.toString() ,
        imagen: "https://ui-avatars.com/api/?name=Usuario+Prueba&background=007bff&color=fff&size=32"
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav style={{
                height: '80px',
                width: '100%',
                position: 'fixed',
                left: 0,
                top: 0,
                backgroundColor: 'var(--color-acento-claro)',
                padding: '10px 20px',
                fontFamily: 'Inter, sans-serif',
                zIndex: 1000,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div className="d-flex align-items-center justify-content-between h-100">
                    {/* Logo */}
                    <div>
                        <NavLink className="navbar-brand" to="/" onClick={closeMenu}>
                            <img 
                                src="https://raw.githubusercontent.com/fromero34/img-frontend/093bd10a251a63e0cf51e0f38237d102f37d5c04/logo.svg" 
                                alt="logo" 
                                height={anchoImagen}
                            />
                        </NavLink>
                    </div>

                    {/* Enlaces de navegación - Desktop */}
                    <ul className="nav d-flex gap-3 desktop-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `nav-link bg-white rounded-3 px-3 py-2 ${isActive ? 'active fw-bold' : ''}`
                                }
                            >
                                Inicio
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/productos"
                                className={({ isActive }) =>
                                    `nav-link bg-white rounded-3 px-3 py-2 ${isActive ? 'active fw-bold' : ''}`
                                }
                            >
                                Productos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/contacto"
                                className={({ isActive }) =>
                                    `nav-link bg-white rounded-3 px-3 py-2 ${isActive ? 'active fw-bold' : ''}`
                                }
                            >
                                Contacto
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `nav-link bg-white rounded-3 px-3 py-2 ${isActive ? 'active fw-bold' : ''}`
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `nav-link bg-white rounded-3 px-3 py-2 ${isActive ? 'active fw-bold' : ''}`
                                }
                            >
                                Register
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/admin/crear-producto"
                                className={({ isActive }) =>
                                    `nav-link bg-white rounded-3 px-3 py-2 ${isActive ? 'active fw-bold' : ''}`
                                }
                            >
                                Crear producto
                            </NavLink>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3 desktop-actions">
                        {/* Carrito */}
                        <div className="bg-white rounded-3 px-3 py-2 d-flex align-items-center">
                            <NavLink to="/carrito"
                                className={({ isActive }) =>
                                    ` ${isActive ? 'active fw-bold' : ''}`
                                }>
                            <img 
                                src="https://raw.githubusercontent.com/Roger-Valverde/img-frontend/refs/heads/main/carrito.svg" 
                                alt="carrito"
                                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                            />
                            </NavLink>
                            <span className="badge bg-primary"> {getTotalItems()} </span>
                        </div>

                        {/* Perfil de usuario */}
                        <div className="d-flex align-items-center bg-white rounded-3 px-3 py-2">
                            <img 
                                src={usuario.imagen} 
                                alt="Foto de perfil"
                                className="rounded-circle me-2"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    objectFit: 'cover'
                                }}
                            />
                            <span className="fw-bold" style={{ fontSize: '14px' }}>{usuario.nombre}</span>
                        </div>
                    </div>

                    {/* Menú Hamburguesa - Mobile */}
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></div>
                        <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></div>
                        <div className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></div>
                    </div>
                </div>
            </nav>

            {/* Menú Mobile */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    {/* Navegación */}
                    <div className="mobile-nav-section">
                        <h6>Navegación</h6>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `nav-link bg-white ${isActive ? 'active' : ''}`
                            }
                            onClick={closeMenu}
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/productos"
                            className={({ isActive }) =>
                                `nav-link bg-white ${isActive ? 'active' : ''}`
                            }
                            onClick={closeMenu}
                        >
                            Productos
                        </NavLink>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `nav-link bg-white ${isActive ? 'active' : ''}`
                            }
                            onClick={closeMenu}
                        >
                            Login
                        </NavLink>
                    </div>

                    {/* Carrito móvil */}
                    <div className="mobile-nav-section">
                        <h6>Carrito</h6>
                        <div className="mobile-cart">
                            <img 
                                src="https://raw.githubusercontent.com/Roger-Valverde/img-frontend/refs/heads/main/carrito.svg" 
                                alt="carrito"
                                style={{ width: '20px', height: '20px' }}
                            />
                            <span>Carrito (0 items)</span>
                        </div>
                    </div>

                    {/* Perfil móvil */}
                    <div className="mobile-nav-section">
                        <h6>Usuario</h6>
                        <div className="mobile-profile">
                            <img 
                                src={usuario.imagen} 
                                alt="Foto de perfil"
                                className="rounded-circle"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    objectFit: 'cover'
                                }}
                            />
                            <span className="fw-bold">{usuario.nombre}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
