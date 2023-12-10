import { createConnection } from 'mysql'

class Conection {
    constructor() {
        this.connection = createConnection({
            host: "127.0.0.1",
            port: "3306",
            user: "root",
            password: "",
            database: "db_copa"
        })
    }

    connect() {
        this.connection.connect((error) => {
            if (error) {
                console.error("Erro ao conectar ao banco de dados:", error);
            } else {
                console.log("Conexão realizada com sucesso");
            }
        })
    }

    /**
     * Método que executa um sql com ou sem valores
     * @param {string} sql sql que vai ser executado
     * @param {string | [selecao, id]} values  parametros para o sql
     * @returns objeto da promisse
     */
    consulta = (sql, values = '') => {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (error, result) => {
                if (error) {
                    return reject("Erro ao executar a consulta SQL: " + error.message);
                }
                const row = JSON.parse(JSON.stringify(result));
                if (row.length === 0) {
                    return resolve("Nenhum resultado encontrado para a consulta.");
                } else {
                    return resolve(row);
                }
            });
        });
    }

    /**
     * Método que verica se já existe um valor no banco antes de fazer uma ação de delete e update
     * @param {string} sql sql que vai ser executado para verificar
     * @param {string} id id da consulta
     * @returns um valor verdadeiro ou falso para comparação
     */
    consultaAuxiliar = (sql, id) => {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, id, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    const row = JSON.parse(JSON.stringify(result))
                    if (row.length > 0) {
                        return resolve(true)
                    } else {
                        return resolve(false)
                    }
                }
            })
        })
    }
}
export default new Conection()