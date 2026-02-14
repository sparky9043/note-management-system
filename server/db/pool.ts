import { Pool } from "pg";
import config from "../src/utils/config";

const pool = new Pool({
  host: 'localhost',
  user: config.DB_USER,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: Number(config.DB_PORT),
});

export default pool;