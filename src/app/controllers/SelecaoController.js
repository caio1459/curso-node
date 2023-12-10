import SelecaoRepository from "../repositorys/SelecaoRepository.js"

class SelecaoController {

    //Lista todas as seleções
    async listAll(req, res) {
        const result = await SelecaoRepository.findAll()
        res.json(result)
    }

    //Lista uma unica seleção
    async listOne(req, res) {
        const id = req.params.id
        const result = await SelecaoRepository.findById(id)
        res.json(result)
    }

    //Cria uma seleção
    async create(req, res) {
        const selecao = req.body
        const result = await SelecaoRepository.create(selecao)
        res.json(result)
    }

    //Atualiza uma seleção
    async update(req, res) {
        const id = req.params.id;
        const selecao = req.body;
        const result = SelecaoRepository.update(id, selecao)
        res.json(result)
    }

    //Exclui uma seleção
    async delete(req, res) {
        const id = req.params.id
        const result = await SelecaoRepository.delete(id)
        res.json(result)
    }

}

//Evita a criação de varios objetos
export default new SelecaoController()