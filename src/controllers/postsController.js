import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js"; // Importa as funções para obter e criar posts do modelo
import fs from 'fs'; // Importa o módulo fs para operações de sistema de arquivos
import gerarDescricaoComGemini from "../services/serviceGemini.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  const posts = await getTodosPosts(); // Obtém todos os posts do modelo
  res.status(200).json(posts); // Envia os posts como resposta JSON
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  const novoPost = req.body; // Obtém os dados do novo post da requisição

  try {
    const postCriado = await criarPost(novoPost); // Cria o novo post no modelo
    res.status(200).json(postCriado); // Envia o post criado como resposta JSON
  } catch (erro) {
    console.error(erro.message); // Registra o erro no console
    res.status(500).json({ "erro": "Falha na requisição." }); // Envia uma resposta de erro
  }
}

// Função assíncrona para fazer upload de imagem e criar um novo post
export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname, // Obtém o nome original do arquivo da imagem
    alt: ""
  };

  try {
    const postCriado = await criarPost(novoPost); // Cria o novo post no modelo
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; // Constrói o novo nome da imagem
    fs.renameSync(req.file.path, imagemAtualizada); // Renomeia o arquivo da imagem para o novo nome
    res.status(200).json(postCriado); // Envia o post criado como resposta JSON
  } catch (erro) {
    console.error(erro.message); // Registra o erro no console
    res.status(500).json({ "erro": "Falha na requisição." }); // Envia uma resposta de erro
  }
}

export async function atualizarNovoPost(req, res) {
  
  const id = req.params.id;
  const { alt } = req.body; // 
  const urlImage = `http://localhost:3000/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    const postAtualizado = {
      imgUrl: urlImage,
      descricao: descricao,
      alt: alt
    }

    const postCriado = await atualizarPost(id, postAtualizado);
    res.status(200).json(postCriado); 
  } catch (erro) {
    console.error(erro.message); 
    res.status(500).json({ "erro": "Falha na requisição." }); 
  }
}
