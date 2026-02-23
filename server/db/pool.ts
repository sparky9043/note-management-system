import { Pool } from "pg";
import config from "../src/utils/config";

// X5bzbEk322nt7pjD

// Connection to Local DB

// const pool = new Pool({
//   host: 'localhost',
//   user: config.DB_USER,
//   database: config.DB_NAME,
//   password: config.DB_PASSWORD,
//   port: Number(config.DB_PORT),
// });

// Connection to Supabase
const pool = new Pool({
  connectionString: `postgresql://postgres.hzngyjgzujitgjqprgup:${config.SUPABASE_DB_PASSWORD}@aws-1-ap-south-1.pooler.supabase.com:5432/postgres`
});

export default pool;