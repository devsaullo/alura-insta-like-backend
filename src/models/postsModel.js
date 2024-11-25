import 'dotenv/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função para conectar ao banco de dados

// Estabelece a conexão com o banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.CONEXAO_DB);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
  const db = conexao.db("alura-backend-instabytes"); // Obtém o banco de dados
  const collection = db.collection("posts"); // Obtém a coleção de posts
  return collection.find().toArray(); // Retorna todos os posts como um array
}

// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
  const db = conexao.db("alura-backend-instabytes"); // Obtém o banco de dados
  const collection = db.collection("posts"); // Obtém a coleção de posts
  return collection.insertOne(novoPost); // Insere o novo post na coleção e retorna o resultado
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("alura-backend-instabytes"); 
  const collection = db.collection("posts"); 
  const objId = ObjectId.createFromHexString(id)
  return collection.updateOne({_id: new ObjectId(objId)}, {$set: novoPost});
}