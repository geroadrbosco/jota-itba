import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ProtectedRoute } from "./security/ProtectedRouter";

import { Carrito } from "./pages/Carrito";
import { Contact } from "./pages/Contact";
import { CrearProducto } from "./pages/CrearProducto";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { ProductsList } from "./pages/ProductsList";
import { Register } from "./pages/Register";
import { ProductDetail } from "./pages/ProductDetail";
import { Profile } from "./pages/profile";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "productos",
        children: [
          { index: true, element: <ProductsList /> },
          { path: ":id", element: <ProductDetail /> },
        ],
      },
      { path: "carrito", element: <Carrito /> },
      { path: "contacto", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <NotFound /> },
      { 
        path: "/profile", 
        element: (
        <ProtectedRoute>
        <Profile/>
        </ProtectedRoute>)},

      {
        path: "admin/crear-producto",
        element: (
          <ProtectedRoute>
            <CrearProducto />
          </ProtectedRoute>
        ),
      },
    ],
  }
]);