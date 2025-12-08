Proyecto: E-commerce Mueblería Hermanos Jota
Integrantes: Kevin Serrano, Gerónimo Bosco, Ivanna Valle, Fernando Romero, Jeffrey Valverde.

Tecnologías Utilizadas: React, Node js, Express.js Y MongoDB

Link del backend en render: https://jota-itba-1.onrender.com
Link del frontend en vercel: https://jota-itba.vercel.app/ 

el .env en frontend debe contener: 
VITE_PUBLIC_BACKEND_URL=https://jota-itba.onrender.com/

el .env en backend debe contener:
MONGO_URI_LOCAL='mongodb://localhost:27017/jota-store'
MONGO_URI=mongodb+srv://itba_db_user:13579@cluster-itba.igytkal.mongodb.net/
ALLOWED_ORIGIN=https://jota-itba.vercel.app/

Instalación local:
1- Clonar proyecto https://github.com/kevinserrano01/jota-itba.git
2- Entrar a la carpeta del backend con "cd backend"
3- Hacer npm install
4- Hacer npm start
5- Abrir otra terminar y hacer "cd frontend"
6- Hacer npm install
7- Hacer npm run dev
