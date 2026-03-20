<template>
  <div class="container">

    <div class="card">
      <h1>Sistema Clínica</h1>

      <!-- LOGIN -->
      <div v-if="!logado">
        <input v-model="email" placeholder="Email" />
        <input v-model="senha" type="password" placeholder="Senha" />
        <button @click="login">Entrar</button>
      </div>

      <!-- SISTEMA -->
      <div v-else>
        <h2>Bem-vindo 👋</h2>

        <div class="agendamento">
          <h3>Agendar Consulta</h3>
          <input v-model="nome" placeholder="Nome do paciente" />
          <input v-model="cpf" placeholder="CPF" />
          <input v-model="data" type="date" />
          <input v-model="hora" type="time" />
          <button @click="agendar">Agendar</button>
        </div>

        <div class="lista">
          <h3>Consultas</h3>
          <ul>
            <li v-for="c in consultas" :key="c.data + c.hora">
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
      cpf: '',
      data: '',
      hora: '',
      consultas: []
    }
  },

  mounted() {
    const logado = localStorage.getItem('logado');
    if (logado) {
      this.logado = true;
      this.carregarConsultas();
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
          localStorage.setItem('logado', 'true');
          this.logado = true;
          this.carregarConsultas();
        }
      } catch {
        alert("Login inválido");
      }
    },

    logout() {
      localStorage.removeItem('logado');
      this.logado = false;
    },

    async agendar() {
      try {
        await axios.post(`${API}/agendar`, {
          nome: this.nome,
          cpf: this.cpf,
          data: this.data,
          hora: this.hora
        });

        this.nome = '';
        this.cpf = '';
        this.data = '';
        this.hora = '';

        this.carregarConsultas();
      } catch (err) {
        alert("Erro ao agendar");
      }
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
  font-family: Arial;
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
  background: #3b82f6;
  border: none;
  border-radius: 6px;
  color: white;
}

.lista li {
  background: #334155;
  margin: 5px 0;
  padding: 10px;
  border-radius: 6px;
}

.logout {
  margin-top: 15px;
  background: #ef4444;
}
</style>