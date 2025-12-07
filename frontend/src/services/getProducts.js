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
;