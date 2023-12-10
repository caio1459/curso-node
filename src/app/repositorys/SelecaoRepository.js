import Conection from "../database/conection.js";

class SelecaoRepository {
    findAll() {
        const sql = "SELECT * FROM selecoes;";
        return Conection.consulta(sql)
    }

    findById(id) {
        const sql = 'SELECT * FROM selecoes WHERE id = ?;'
        return Conection.consulta(sql, id)
    }

    findAuxiliar(id) {
        const sql = 'SELECT * FROM selecoes WHERE id = ?;'
        return Conection.consultaAuxiliar(sql, id)
    }

    create(selecao) {
        const sql = "INSERT INTO selecoes SET ?;";
        return Conection.consulta(sql, selecao)
    }

    async update(id, selecao) {
        //Função auxiliar que cerifica se foi encontrado o id
        const checkResults = await this.findAuxiliar(id)
        if (checkResults === true) {
            const sql = "UPDATE selecoes SET ? WHERE id = ?;"
            return Conection.consulta(sql, [selecao, id])
        } else {
            return console.log("ID não encontrado. Não é possível atualizar.")
        }
    }

    async delete(id) {
        const checkResults = await this.findAuxiliar(id)
        if (checkResults === true) {
            const sql = "DELETE FROM selecoes WHERE id = ?;";
            return Conection.consulta(sql, id)
        } else {
            return console.log("ID não encontrado. Não é possível deletar.")
        }
    }
}

export default new SelecaoRepository()