import { Router } from "express";
import SelecaoController from "../app/controllers/SelecaoController.js";

const router = Router()

//Rotas
router.get("/selecoes", SelecaoController.listAll);
router.get("/selecoes/:id", SelecaoController.listOne)
router.post("/selecoes", SelecaoController.create);
router.put("/selecoes/:id", SelecaoController.update);
router.delete("/selecoes/:id", SelecaoController.delete);

export default router