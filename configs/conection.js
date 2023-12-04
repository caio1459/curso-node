import { createConnection } from 'mysql'

//Cria conexão com mysql
const conection = createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "db_copa"
})

conection.connect((error) => {
    if (error) {
        console.error(error)
    } else {
        //Cria uma conexão
        console.log("Conexão realizada com sucesso")
    }
})

export default conection