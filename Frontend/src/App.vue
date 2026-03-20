<template>
  <div class="container">

    <div class="card">
      <h1>Sistema Clínica</h1>

      <!-- LOGIN -->
      <div v-if="!logado" class="login">
        <input v-model="nome" placeholder="Nome do paciente" />
        <input v-model="cpf" placeholder="CPF" />
        <input v-model="data" type="date" />
        <input v-model="hora" type="time" />
        <button @click="login">Entrar</button>
      </div>

      <!-- SISTEMA -->
      <div v-else>
        <h2>Bem-vindo 👋</h2>

        <div class="agendamento">
          <h3>Agendar Consulta</h3>
          <input v-model="nome" placeholder="Nome do paciente" />
          <input v-model="data" type="date" />
          <button @click="agendar">Agendar</button>
        </div>

        <div class="lista">
          <h3>Consultas Agendadas</h3>
          <ul>
            <li v-for="c in consultas" :key="c.data">
              <strong>{{ c.nome }}</strong><br>
              <span>{{ c.data }} às {{ c.hora }}</span><br>
              <small>CPF: {{ c.cpf }}</small>
            </li>
          </ul>
        </div>

        <button class="logout" @click="logout">Sair</button>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios';

const API = "https://clinica-app-vutp.onrender.com";

export default {
  data() {
    return {
      email: '',
      senha: '',
      logado: false,
      nome: '',
      data: '',
      consultas: []
      cpf: '',
      hora: '', []
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post(`${API}/login`, {
          email: this.email.trim(),
          senha: this.senha.trim()
        });

        if (res.data.token) {
          this.logado = true;
          this.carregarConsultas();
        }
      } catch {
        alert("Login inválido");
      }
    },

    logout() {
      this.logado = false;
      this.email = '';
      this.senha = '';
    },

    async agendar() {
      await axios.post(`${API}/agendar`, {
        nome: this.nome,
        data: this.data,
        hora: this.hora,
        cpf: this.cpf
      });

      this.nome = '';
      this.data = '';
      this.carregarConsultas();
    },

    async carregarConsultas() {
      const res = await axios.get(`${API}/consultas`);
      this.consultas = res.data;
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: white;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background: #1e293b;
  padding: 30px;
  border-radius: 12px;
  width: 350px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

h1 {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border-radius: 6px;
  border: none;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

.lista ul {
  list-style: none;
  padding: 0;
}

.lista li {
  background: #334155;
  margin: 5px 0;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
}

.logout {
  margin-top: 20px;
  background: #ef4444;
}

.logout:hover {
  background: #dc2626;
}
</style>