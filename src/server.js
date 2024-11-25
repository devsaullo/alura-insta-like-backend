import express from "express"; // Importa o framework Express.js para criar aplicações web

// Importa as rotas definidas no arquivo postsRoutes.js
import routes from "./routes/postsRoutes.js";

// Cria uma instância da aplicação Express
const app = express();
app.use(express.static('uploads'))
// Chama a função routes para configurar as rotas na aplicação
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor iniciado...");
});