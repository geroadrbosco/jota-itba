import { getPedidos } from "../services/getProducts";
import { useState } from "react";
import { useEffect } from "react";
import { ProductCard } from "../components/products/ProductCard";

export const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        setLoading(true);
        try {
            const pedidos = await getPedidos();
            setPedidos(pedidos);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className='container text-center py-5'><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
    if (error) return <div className='container text-center py-5'><div className="alert alert-danger">Error al cargar los pedidos.</div></div>;
    if (!pedidos || pedidos.length === 0) return <div className='container text-center py-5'><div className="alert alert-info">No se encontraron pedidos.</div></div>;

    return (
        <div className="container-fluid" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container">
                <h1 className="text-center mb-5">Lista de Pedidos</h1>
                <div className="row g-4 justify-content-center">
                    {pedidos.map((pedido) => (
                        <div key={pedido._id} className="col-12 col-md-6 col-lg-4">
                            <div className="card p-4 shadow-sm h-100">
                                <h5 className="card-title">Pedido #{pedido._id?.slice(-6)}</h5>
                                <p><strong>Total:</strong> ${pedido.total?.toFixed(2)}</p>
                                <p><strong>Estado:</strong> <span className="badge bg-secondary">{pedido.estado}</span></p>
                                <h6 className="mt-3">Productos:</h6>
                                <ul className="list-group list-group-flush">
                                    {pedido.items?.map((item) => (
                                        <li key={item._id} className="list-group-item d-flex justify-content-between">
                                            <span>{item.nombre} <small>(x{item.cantidad})</small></span>
                                            <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};