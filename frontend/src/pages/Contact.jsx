export const Contact = () => {
    return (
        <div className="container" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <h1 className="text-center mb-5">Contacto</h1>
            <p className="text-center">Puedes contactarnos a través del siguiente formulario:</p>
            <form className="mx-auto" style={{ maxWidth: '600px' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" placeholder="Tu nombre" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" placeholder="Tu correo electrónico" />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Mensaje</label>
                    <textarea className="form-control" id="message" rows="4" placeholder="Tu mensaje"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    );
};
