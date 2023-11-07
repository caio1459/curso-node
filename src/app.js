import express from "express";

//Cria uma intancia do express
const app = express();

//indica para o express ler em formato JSON
app.use(express.json());

const selecoes = [
  { id: 1, nome: "Brasil", grupo: "G" },
  { id: 2, nome: "Japão", grupo: "B" },
  { id: 3, nome: "Alemanha", grupo: "G" },
  { id: 4, nome: "Portugal", grupo: "B" },
];

//Funções auxiliares
function buscarSelecaoPorId(id) {
  return selecoes.filter(selecao => selecao.id == id)
}

function buscarIndex(id) {
  return selecoes.findIndex(selecao => selecao.id == id)
}

//Criar rota padrão
app.get("/", (req, res) => {
  res.send("Rota acessada com sucesso");
});

//Listar todos
app.get("/selecoes", (req, res) => {
  res.status(200).send(selecoes);
});

//Criar seleção
app.post("/selecoes", (req, res) => {
  selecoes.push(req.body);
  // res.status(201).send("Seleção cadastrada com sucesso!");
  res.json(selecoes)
});

//Listar seleção
app.get("/selecoes/:id", (req, res) => {
  let id = req.params.id
  res.json(buscarSelecaoPorId(id)).status(200)
})

//Excluir seleção
app.delete("/selecoes/:id", (req, res) => {
  let index = buscarIndex(req.params.id)
  selecoes.splice(index, 1) //Corta um elemento de um array
  if (selecoes[index]) {
    res.status(202).send(`Seleção com id ${req.params.id} excluida com sucesso`)
  } else {
    res.send("Seleção não encontrada")
  }
})

app.put("/selecoes/:id", (req, res) => {
  let index = buscarIndex(req.params.id)
  //Conteudo da seleção de acordo com o index é substituido pelo parametro que está sendo criado no corpo da requisição
  selecoes[index].nome = req.body.nome
  selecoes[index].grupo = req.body.grupo
  res.json(selecoes)
})

export default app;
