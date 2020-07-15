const app = require('express')();
const dotenv = require('dotenv');
dotenv.config();

const routes = require('./src/routes');
const { PORT } = process.env;

app.use('/v1', routes);
app.listen(PORT, () => console.info(`Server listening at ${PORT}`));