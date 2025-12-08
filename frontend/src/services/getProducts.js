import { api, getAuthHeaders } from './client.js';

// CRUD de productos
export const getProducts = async () => {
  try {
    const response = await api.get('/api/productos', getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const deleteProduct = async (productoId) => {
  try {
    const response = await api.delete(`api/productos/${productoId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error
  }
}

export const createPedido = async (pedidosData) => {
  try {
    const response = await api.post("/api/pedidos", pedidosData);
    return response.data;
  } catch (error) {
    console.error("Error", error)
    throw error
  }
}

export const getPedidos = async () => {
  try {
    const response = await api.get('/api/pedidos');
    return response.data.pedidos;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
  ;