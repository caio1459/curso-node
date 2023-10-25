import app from "./src/app.js";

//Define uma porta
const PORT = 3000;

//Escutar a porta criada
app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço: http://localhost:${PORT}`);
});
