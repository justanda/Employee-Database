import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employeetracker",
  password: "password",
  port: 5432,
});

export { pool };
