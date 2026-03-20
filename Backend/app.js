require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// CONEXÃO COM MONGO
// ==========================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo conectado'))
  .catch(err => console.log(err));

// ==========================
// ROTAS
// ==========================

// teste
app.get('/', (req, res) => {
  res.send('API rodando');
});

// ==========================
// LOGIN
// ==========================
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === "admin@test.com" && senha === "123456") {
    return res.json({ token: "fake-jwt-token" });
  }

  return res.status(401).json({ erro: "Login inválido" });
});

// ==========================
// AGENDAMENTO
// ==========================
let consultas = [];

app.post('/agendar', (req, res) => {
  const { nome, data } = req.body;

  if (!nome || !data) {
    return res.status(400).json({ erro: "Dados inválidos" });
  }

  // evita duplicar horário
  const existe = consultas.find(c => c.data === data);

  if (existe) {
    return res.status(400).json({ erro: "Horário já ocupado" });
  }

  consultas.push({ nome, data });

  res.json({ mensagem: "Consulta agendada com sucesso" });
});

app.get('/consultas', (req, res) => {
  res.json(consultas);
});

// ==========================
// PORTA (IMPORTANTE)
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});