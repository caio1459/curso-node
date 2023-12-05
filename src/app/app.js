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
  const selecao = req.body
  const sql = "INSERT INTO selecoes SET ?;";
  conection.query(sql, selecao, (error, results, fields) => {
    if (error) {
      res.status(400).json({ 'erro': error })
    } else {
      res.status(201).json(results)
    }
  })
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

app.delete("/selecoes/:id", (req, res) => {
  const id = req.params.id;

  // Verifica se o ID existe antes de executar a exclusão
  const checkIfExistsSQL = 'SELECT * FROM selecoes WHERE id = ?;';
  conection.query(checkIfExistsSQL, id, (error, results, fields) => {
    if (error) {
      res.status(400).json({ 'erro': error });
    } else {
      if (results.length > 0) {
        // O ID existe, então podemos proceder com a exclusão
        const deleteSQL = 'DELETE FROM selecoes WHERE id = ?;';
        conection.query(deleteSQL, id, (deleteError, deleteResults, deleteFields) => {
          if (deleteError) {
            res.status(400).json({ 'erro': deleteError });
          } else {
            res.status(201).json(deleteResults);
          }
        });
      } else {
        // O ID não existe, exibir mensagem de alerta
        res.status(404).json({ 'mensagem': 'ID não encontrado.' });
      }
    }
  });
});

app.put("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const selecao = req.body;

  // Verifica se o ID existe antes de executar a atualização
  const checkIfExistsSQL = 'SELECT * FROM selecoes WHERE id = ?;';
  conection.query(checkIfExistsSQL, id, (checkError, checkResults, checkFields) => {
    if (checkError) {
      res.status(400).json({ 'erro': checkError });
    } else {
      if (checkResults.length > 0) {
        // O ID existe, então podemos proceder com a atualização
        const updateSQL = "UPDATE selecoes SET ? WHERE id = ?;";
        conection.query(updateSQL, [selecao, id], (updateError, updateResults, updateFields) => {
          if (updateError) {
            res.status(400).json({ 'erro': updateError });
          } else {
            res.status(200).json(updateResults);
          }
        });
      } else {
        // O ID não existe, exibir mensagem de erro
        res.status(404).json({ 'mensagem': 'ID não encontrado. Não é possível atualizar.' });
      }
    }
  });
});


export default app;
