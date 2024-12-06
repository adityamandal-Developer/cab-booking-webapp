/**
 * @pakages
**/
import { createServer } from 'http'
import app from "./app.js"
import chalk from 'chalk'
/**
 * @Configurations
**/
const PORT = process.env.PORT || 3000
const server = createServer(app)

server.listen(PORT, () => {
    console.log(chalk.cyan(`Server is running on PORT ${PORT} 🚀`))
})