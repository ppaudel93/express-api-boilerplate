import app from './app'
import connectToDb from './utils/connect-to-db'

connectToDb()

const port = 3000

app.listen(port, () => console.log(chalk.bold.green(`Server started on port ${port}!`)))