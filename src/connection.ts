import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employees_db",
  password: "password",
  port: 5432,
});

export { pool };
