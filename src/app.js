//Importa o express
const express = require("express");
//Cria uma intancia do express
const app = express();
//Define uma porta


//Criar rota padrão
app.get("/", (request, response) => {
  response.send("Rota acessada com sucesso");
});


//Escutar a porta criada
app.listen(port, () => {
  console.log(`Servidor rodando no endereço: http://localhost:${port}`);
});
