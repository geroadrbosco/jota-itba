E-commerce — Mueblería Hermanos Jota

Proyecto desarrollado como parte del trabajo grupal por:

Kevin Serrano · Gerónimo Bosco · Ivanna Valle · Fernando Romero · Jeffrey Valverde

1. Tecnologías Utilizadas

Frontend: React (Vite)

Backend: Node.js, Express.js

Base de Datos: MongoDB (Atlas)

Servicios de Hosting:

Backend: Render

Frontend: Vercel

2. Enlaces de Deploy

Backend: https://jota-itba-1.onrender.com

Frontend: https://jota-itba.vercel.app/

3. Configuración de Variables de Entorno
3.1 Frontend (.env)

En la carpeta frontend, crear un archivo .env con el siguiente contenido:

VITE_PUBLIC_BACKEND_URL=https://jota-itba.onrender.com/

3.2 Backend (.env)

En la carpeta backend, crear un archivo .env con:

MONGO_URI_LOCAL='mongodb://localhost:27017/jota-store'
MONGO_URI='mongodb+srv://itba_db_user:13579@cluster-itba.igytkal.mongodb.net/'
ALLOWED_ORIGIN=https://jota-itba.vercel.app/

4. Instalación y Ejecución en Entorno Local

A continuación se describen los pasos para ejecutar el proyecto localmente:

4.1 Clonar el repositorio
git clone https://github.com/kevinserrano01/jota-itba.git

4.2 Puesta en marcha del Backend
cd jota-itba/backend
npm install
npm start

4.3 Puesta en marcha del Frontend

En una terminal independiente:

cd jota-itba/frontend
npm install
npm run dev

5. Notas Técnicas

Para utilizar la base de datos local, es necesario contar con MongoDB instalado en el equipo.

En caso de presentarse errores de conexión o CORS, verificar la correcta configuración de las variables de entorno mencionadas anteriormente.

6. Descripción General del Proyecto

Este proyecto consiste en el desarrollo de un sistema de comercio electrónico para una mueblería. Incluye funcionalidades tales como:

Gestión y visualización de productos

Carrito de compras

Gestión de usuarios

Procesos de autenticación

Integración de frontend y backend mediante API REST
