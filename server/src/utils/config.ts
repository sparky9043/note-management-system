import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const DB_USER = process.env.DB_USER;

const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_PORT = process.env.DB_PORT || 5432;

export default { PORT, DB_USER, DB_PASSWORD, DB_PORT };