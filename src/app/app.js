import express from "express";
import SelecaoController from "./controllers/SelecaoController.js";

//Cria uma intancia do express
const app = express();
//indica para o express ler em formato JSON
app.use(express.json());

//Rotas
app.get("/selecoes", SelecaoController.listAll);
app.get("/selecoes/:id", SelecaoController.listOne)
app.post("/selecoes", SelecaoController.create);
app.put("/selecoes/:id", SelecaoController.update);
app.delete("/selecoes/:id", SelecaoController.delete);

export default app;