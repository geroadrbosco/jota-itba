import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { createPedido } from '../services/getProducts';

export const Carrito = () => {
  const {
    cartItems,
    removeItemFromCart,
    updateItemQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart
  } = useContext(CartContext);
  const { isAuthenticated } = useAuth()

  const navigate = useNavigate();

  const handleRemove = (_id) => {
    removeItemFromCart(_id);
    toast.info('Producto eliminado del carrito', {
      position: 'top-right'
    });
  };

  const handleQuantityChange = (_id, newQuantity) => {
    if (newQuantity < 1) return;
    updateItemQuantity(_id, newQuantity);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warn('El carrito está vacío');
      return;
    }
    if (!isAuthenticated) {
      toast.warn('Debes iniciar sesión para la compra');
      return;
    }
    const pedidoData = {
      items: cartItems.map(item => ({
        _id: item._id,
        cantidad: item.quantity
    }))}
    createPedido(pedidoData);
    clearCart();
    toast.success('¡Gracias por tu compra! 🎉');
    navigate("/pedidos");
  };

  // Carrito vacío
  if (getTotalItems() === 0) {
    return (
      <div style={{
        paddingTop: '100px',
        paddingLeft: '20px',
        paddingRight: '20px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>🛒 Tu carrito está vacío</h2>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '30px' }}>
            Agrega productos para poder verlos aquí.
          </p>
          <button
            onClick={() => navigate('/productos')}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              fontSize: '1.1rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      paddingTop: '100px',
      paddingLeft: '20px',
      paddingRight: '20px',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '2rem',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        🛒 Tu carrito
      </h1>

      <div style={{
        display: 'flex',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '2', minWidth: '300px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cartItems.map((item) => (
              <div
                key={item._id}
                style={{
                  display: 'flex',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                  padding: '15px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.imagenURL?.trim() || 'https://via.placeholder.com/80?text=Sin+imagen'}
                  alt={item.nombre}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginRight: '15px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.3rem' }}>{item.nombre}</h3>
                  <p style={{ color: '#28a745', fontWeight: 'bold', margin: '0 0 10px' }}>
                    ${item.precio}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      -
                    </button>
                    <span style={{
                      margin: '0 12px',
                      fontWeight: 'bold',
                      minWidth: '24px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', paddingLeft: '15px' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 10px' }}>
                    ${(item.precio * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          flex: '1',
          minWidth: '280px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Resumen</h3>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Productos:</span>
              <strong>{getTotalItems()}</strong>
            </div>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
              <span>Total:</span>
              <strong style={{ color: '#28a745' }}>${getTotalPrice()}</strong>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              width: '100%',
              padding: '14px',
              borderRadius: '6px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '15px'
            }}
          >
            Finalizar compra
          </button>

          <button
            onClick={() => navigate('/productos')}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
};
