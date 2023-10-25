import express from "express";

//Cria uma intancia do express
const app = express();

const selecoes = [
  { id: 1, nome: "Brasil", grupo: "G" },
  { id: 2, nome: "Japão", grupo: "B" },
  { id: 3, nome: "Alemanha", grupo: "G" },
  { id: 4, nome: "Portugal", grupo: "B" },
];

//Criar rota padrão
app.get("/", (req, res) => {
  res.send("Rota acessada com sucesso");
});

app.get("/selecoes", (req, res) => {
  res.send("Vem pro fut");
});

export default app;
