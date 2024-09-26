// Importa o módulo express, que facilita a criação de um servidor web em Node.js
const express = require('express');

// Importa uma coleção de dados sobre UFs (Unidades Federativas) de um arquivo externo
const colecaoUf = require('./dados/dados.js');

// Cria uma instância do aplicativo Express
const app = express();

// Cria uma rota para obter todas as UFs
// Quando um usuário acessar '/ufs', o servidor vai responder com a lista completa de UFs
app.get('/ufs', (req, res) => {
  res.json(colecaoUf); // Retorna a lista de UFs no formato JSON (formato padrão para troca de dados)
});

// Cria uma rota para obter uma UF específica baseada no ID fornecido na URL
// O ':iduf' indica que o ID da UF será passado como parte da URL, ex: '/ufs/5'
app.get('/ufs/:iduf', (req, res) => {
  // Converte o parâmetro 'iduf' da URL para um número inteiro
  const idUF = parseInt(req.params.iduf);
  
  // Inicializa variáveis para guardar uma mensagem de erro (se necessário) e a UF encontrada
  let mensagemErro = '';
  let uf;

  // Verifica se o ID fornecido é um número válido
  if (!(isNaN(idUF))) {
    // Busca na coleção de UFs a que tem o mesmo ID passado na URL
    uf = colecaoUf.colecaoUf.find(u => u.id === idUF);
    
    // Se não encontrar a UF com o ID, define uma mensagem de erro
    if (!uf) {
      mensagemErro = 'UF não encontrada';
    }
  } else {
    // Se o ID passado não for um número, define uma mensagem de erro indicando requisição inválida
    mensagemErro = 'Requisição inválida';
  }

  // Se a UF foi encontrada, envia os dados dela em formato JSON como resposta
  if (uf) {
    res.json(uf);
  } else {
    // Caso contrário, retorna uma mensagem de erro com status 404 (não encontrado)
    res.status(404).json({ "erro": mensagemErro });
  }
});

// Inicia o servidor na porta 8080 e exibe uma mensagem no console indicando que o servidor está rodando
app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080');
});
