import { ProductCard } from '../components/products/ProductCard';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/getProducts';

export const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);
    
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const products = await getProducts();
            setProducts(products);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className='container text-center py-5'><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
    if (error) return <div className='container text-center py-5'><div className="alert alert-danger">Error al cargar los productos.</div></div>;
    if (!products || products.length === 0) return <div className='container text-center py-5'><div className="alert alert-info">No se encontraron productos.</div></div>;

    return (
        <div className="container-fluid" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container">
                <h1 className="text-center mb-5">Lista de Productos</h1>
                <div className="row g-4 justify-content-center">
                    {products.map(product => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};