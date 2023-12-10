import express from "express";
import router from "../routes/router.js";

//Cria uma intancia do express
const app = express();

//Usa o router
app.use(router)

//indica para o express ler em formato JSON
app.use(express.json());

export default app;