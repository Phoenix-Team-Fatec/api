import "dotenv/config"
import { AppDataSource } from "./AppDataSource"

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected")
        return AppDataSource.destroy()
    })
    .catch((error) => console.error('Erro de conexão com a database', error))