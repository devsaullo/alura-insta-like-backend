import express from 'express'; // Importa o framework Express.js para criar aplicações web
import cors from 'cors'
// Importa as funções controladoras para posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';
const corsOptions = {
  origin: "http://localhost:8000",
  optionSuccessStatus: 200
}
// Importa o middleware multer para lidar com uploads de arquivos
import multer from 'multer';

// Configura o armazenamento de arquivos para o multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads: 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo durante o upload
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define uma função para configurar as rotas na aplicação Express
const routes = (app) => {
  // Habilita o processamento de dados JSON nas requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (tratada pela função listarPosts)
  app.get('/posts', listarPosts);

  // Rota POST para criar um novo post (tratada pela função postarNovoPost)
  app.post('/posts', postarNovoPost);

  // Rota POST para fazer upload de imagem (usa o middleware upload.single("imagem") e a função uploadImagem)
  app.post('/upload', upload.single("imagem"), uploadImagem);

  //
  app.put('/upload/:id', atualizarNovoPost)
};

// Exporta a função routes para uso em outros arquivos do projeto
export default routes;