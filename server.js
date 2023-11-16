import app from "./src/app.js";
import conection from "./configs/conection.js";

//Define uma porta
const PORT = 3000;

//Cria uma conexão
conection.connect((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log("Conexão realizada com sucesso")
    //Escutar a porta criada
    app.listen(PORT, () => {
      console.log(`Servidor rodando no endereço: http://localhost:${PORT}`);
    });
  }
})


