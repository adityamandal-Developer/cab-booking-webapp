import chalk from 'chalk';
import mongoose from 'mongoose';

function connectdb() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log(chalk.magenta("Connected to the database successfully!🛢️"));
        })
        .catch((error) => {
            console.log(chalk.red("Failed to connect to the database! ❌"), error);
        });
}
export default connectdb;
