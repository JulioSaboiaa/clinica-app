<template>
  <div style="text-align:center; margin-top:50px;">
    <h1>Sistema Clínica</h1>
    <button @click="testar">Testar API</button>
    <p>{{ mensagem }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mensagem: ''
    }
  },
  methods: {
async testar() {
  try {
    const res = await axios.get('https://clinica-app-vutp.onrender.com');
    this.mensagem = res.data;
  } catch (err) {
    alert("erro na API");
    console.log(err);
  }
}
  }
}
</script>