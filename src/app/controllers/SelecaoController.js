import conection from "../database/conection.js"

class SelecaoController {

    //Lista todas as seleções
    async listAll(req, res) {
        const sql = "SELECT * FROM selecoes;";
        await conection.query(sql, (error, results, filds) => {
            if (error) {
                res.status(404).json({ 'erro': error })
            } else {
                res.status(200).json(results)
            }
        })
    }

    //Lista uma unica seleção
    async listOne(req, res) {
        const id = req.params.id
        const sql = 'SELECT * FROM selecoes WHERE id = ?;'
        await conection.query(sql, id, (error, results, fields) => {
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
    }

    //Cria uma seleção
    async create(req, res) {
        const selecao = req.body
        const sql = "INSERT INTO selecoes SET ?;";
        await conection.query(sql, selecao, (error, results, fields) => {
            if (error) {
                res.status(400).json({ 'erro': error })
            } else {
                res.status(201).json(results)
            }
        })
    }

    //Atualiza uma seleção
    async update(req, res) {
        const id = req.params.id;
        const selecao = req.body;
        // Verifica se o ID existe antes de executar a atualização
        const checkIfExistsSQL = 'SELECT * FROM selecoes WHERE id = ?;';
        await conection.query(checkIfExistsSQL, id, (checkError, checkResults, checkFields) => {
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
    }

    //Exclui uma seleção
    async delete(req, res) {
        const id = req.params.id;
        // Verifica se o ID existe antes de executar a exclusão
        const checkIfExistsSQL = 'SELECT * FROM selecoes WHERE id = ?;';
        await conection.query(checkIfExistsSQL, id, (error, results, fields) => {
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
    }

}

//Evita a criação de varios objetos
export default new SelecaoController()