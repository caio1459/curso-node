import { createConnection } from 'mysql'

const conection = createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "",
    database: "db_copa"
})

export default conection