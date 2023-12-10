import app from "./app.js";

//Define uma porta
const PORT = process.env.PORT || 3000;

//Escutar a porta criada
app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço: http://localhost:${PORT}`);
});