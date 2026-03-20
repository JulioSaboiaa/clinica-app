<template>
  <div style="text-align:center; margin-top:50px;">
    
    <h1>Sistema Clínica</h1>

    <div v-if="!logado">
      <input v-model="email" placeholder="Email" />
      <input v-model="senha" placeholder="Senha" type="password" />
      <br><br>
      <button @click="login">Entrar</button>
    </div>

    <div v-else>
      <h3>Bem-vindo!</h3>

      <h3>Agendar Consulta</h3>
      <input v-model="nome" placeholder="Nome" />
      <input v-model="data" type="date" />
      <br><br>
      <button @click="agendar">Agendar</button>

      <h3>Consultas</h3>
      <ul>
        <li v-for="c in consultas" :key="c.data">
          {{ c.nome }} - {{ c.data }}
        </li>
      </ul>
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
      mensagem: '',
      nome: '',
      data: '',
      consultas: []
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
      } catch (err) {
        console.error(err);
        alert("Login inválido");
      }
    },

    async testar() {
      const res = await axios.get(API);
      this.mensagem = res.data;
    },

    async agendar() {
      try {
        await axios.post(`${API}/agendar`, {
          nome: this.nome,
          data: this.data
        });

        this.nome = '';
        this.data = '';
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