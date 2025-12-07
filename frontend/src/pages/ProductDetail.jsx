import { useEffect, useState, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts } from '../services/getProducts';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:3001/';

export const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { addItemToCart } = useContext(CartContext)

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        try {
            const products = await getProducts();
            const foundProduct = products.find(p => p.id === parseInt(id));
            if (foundProduct) {
                setProduct(foundProduct);
                document.title = `Hermanos Jota - ${foundProduct.nombre}`;
            } else {
                setError('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            setError('Error al cargar el producto');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const agregarAlCarrito = (producto) => {
        addItemToCart(producto)
        console.log('Agregar al carrito:', producto);
        toast.success('Producto agregado al carrito');
    };

    const handleEliminar = async (productoId) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) {
      return;
    }

    try {
      await api.delete(`/api/productos/${productoId}`);
      navigate('/productos');
      alert("Producto eliminado exitosamente")

      navigate('/productos');
      alert("Producto eliminado exitosamente")

    } catch (error) {
      console.error('❌ Error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Error al eliminar';
      alert('No se pudo eliminar el producto: ' + errorMessage);
    }
  };

    if (loading) return <div className='container text-center' style={{ paddingTop: '100px' }}>Cargando...</div>;
    if (error) return <div className='container text-center' style={{ paddingTop: '100px' }}>{error}</div>;
    if (!product) return <div className='container text-center' style={{ paddingTop: '100px' }}>Producto no encontrado</div>;

    return (
        <div style={{ 
            paddingTop: '100px', 
            paddingLeft: '20px', 
            paddingRight: '20px',
            minHeight: '100vh' 
        }}>
            <Link to="/productos" style={{ 
                color: '#007bff', 
                textDecoration: 'none', 
                marginBottom: '20px',
                display: 'inline-block'
            }}>
                ← Volver a productos
            </Link>
            
            <div id="producto-detalle" style={{
                display: 'flex',
                gap: '40px',
                maxWidth: '1200px',
                margin: '0 auto',
                flexWrap: 'wrap'
            }}>
                <div className="producto-imagen" style={{
                    flex: '1',
                    minWidth: '300px'
                }}>
                    <img 
                        src={product.imagenURL?.trim()} 
                        alt={product.nombre}
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
                
                <div className="producto-info" style={{
                    flex: '1',
                    minWidth: '300px'
                }}>
                    <h1>{product.nombre}</h1>
                    <p className="precio" style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#28a745',
                        margin: '20px 0'
                    }}>${product.precio}</p>
                    <p className="descripcion" style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.6',
                        marginBottom: '30px',
                        color: '#555'
                    }}>{product.descripcion}</p>
                    
                    <div className="especificaciones" style={{
                        marginBottom: '30px'
                    }}>
                        <h3 style={{ marginBottom: '20px' }}>Especificaciones</h3>
                        <div className="spec-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '15px'
                        }}>
                            <div className="spec-item" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px'
                            }}>
                                <span className="spec-label" style={{ fontWeight: 'bold' }}>Medidas:</span>
                                <span className="spec-value">{product.medidas}</span>
                            </div>
                            <div className="spec-item" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px'
                            }}>
                                <span className="spec-label" style={{ fontWeight: 'bold' }}>Materiales: </span>
                                <span className="spec-value">{product.materiales}</span>
                            </div>
                            <div className="spec-item" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '4px'
                            }}>
                                <span className="spec-label" style={{ fontWeight: 'bold' }}>Acabado:</span>
                                <span className="spec-value">{product.acabado}</span>
                            </div>
                            {product.peso && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Peso:</span>
                                    <span className="spec-value">{product.peso}</span>
                                </div>
                            )}
                            {product.capacidad && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Capacidad:</span>
                                    <span className="spec-value">{product.capacidad}</span>
                                </div>
                            )}
                            {product.modulares && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Modulares:</span>
                                    <span className="spec-value">{product.modulares}</span>
                                </div>
                            )}
                            {product.tapizado && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Tapizado:</span>
                                    <span className="spec-value">{product.tapizado}</span>
                                </div>
                            )}
                            {product.confort && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Confort:</span>
                                    <span className="spec-value">{product.confort}</span>
                                </div>
                            )}
                            {product.almacenamiento && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Almacenamiento:</span>
                                    <span className="spec-value">{product.almacenamiento}</span>
                                </div>
                            )}
                            {product.cables && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Cables:</span>
                                    <span className="spec-value">{product.cables}</span>
                                </div>
                            )}
                            {product.extension && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Extensión:</span>
                                    <span className="spec-value">{product.extension}</span>
                                </div>
                            )}
                            {product.carga_maxima && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Carga máxima:</span>
                                    <span className="spec-value">{product.carga_maxima}</span>
                                </div>
                            )}
                            {product.caracteristicas && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Características:</span>
                                    <span className="spec-value">{product.caracteristicas}</span>
                                </div>
                            )}
                            {product.regulacion && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Regulación:</span>
                                    <span className="spec-value">{product.regulacion}</span>
                                </div>
                            )}
                            {product.certificacion && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Certificación:</span>
                                    <span className="spec-value">{product.certificacion}</span>
                                </div>
                            )}
                            {product.apilables && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Apilables:</span>
                                    <span className="spec-value">{product.apilables}</span>
                                </div>
                            )}
                            {product.incluye && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Incluye:</span>
                                    <span className="spec-value">{product.incluye}</span>
                                </div>
                            )}
                            {product.rotacion && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Rotación:</span>
                                    <span className="spec-value">{product.rotacion}</span>
                                </div>
                            )}
                            {product.garantia && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Garantía:</span>
                                    <span className="spec-value">{product.garantia}</span>
                                </div>
                            )}
                            {product.estructura && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Estructura:</span>
                                    <span className="spec-value">{product.estructura}</span>
                                </div>
                            )}
                            {product.relleno && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Relleno:</span>
                                    <span className="spec-value">{product.relleno}</span>
                                </div>
                            )}
                            {product.sostenibilidad && (
                                <div className="spec-item" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '4px'
                                }}>
                                    <span className="spec-label" style={{ fontWeight: 'bold' }}>Sostenibilidad:</span>
                                    <span className="spec-value">{product.sostenibilidad}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="acciones">
                        <button 
                            className="btn-agregar"
                            onClick={() => agregarAlCarrito(product)}
                            style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                padding: '15px 30px',
                                fontSize: '1.1rem',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                width: '100%'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                        >
                            Agregar al carrito
                        </button>
                    </div>

                    <div className="acciones">
                        <button 
                            className="btn-agregar"
                            onClick={() => handleEliminar(product.id)}
                            style={{
                                backgroundColor: '#fd1226ff',
                                color: 'white',
                                border: 'none',
                                padding: '15px 30px',
                                fontSize: '1.1rem',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                width: '100%'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#bd3c46ff'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#fd1226ff'}
                        >
                            Eliminar objeto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};