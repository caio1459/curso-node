import express from "express";
import conection from "../../configs/conection.js"

//Cria uma intancia do express
const app = express();

//indica para o express ler em formato JSON
app.use(express.json());

//Funções auxiliares
function buscarSelecaoPorId(id) {
  return selecoes.filter(selecao => selecao.id == id)
}

function buscarIndex(id) {
  return selecoes.findIndex(selecao => selecao.id == id)
}

//Listar todos
app.get("/selecoes", (req, res) => {
  const sql = "SELECT * FROM selecoes;";
  conection.query(sql, (error, results, filds) => {
    if (error) {
      res.status(404).json({ 'erro': error })
    } else {
      res.status(200).json(results)
    }
  })
});

//Criar seleção
app.post("/selecoes", (req, res) => {
  selecoes.push(req.body);
  // res.status(201).send("Seleção cadastrada com sucesso!");
  res.json(selecoes)
});

//Listar seleção
app.get("/selecoes/:id", (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM selecoes WHERE id = ?;'
  conection.query(sql, id, (error, results, fields) => {
    if (error) {
      res.status(404).json({ 'erro': error })
    } else {
      if (results.length === 0) {
        res.status(404).json({ 'mensagem': 'Nenhum resultado encontrado.' });
      } else {
        res.status(200).json(results)
      }
    }
  })
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
