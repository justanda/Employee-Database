import pg from "../node_modules/pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "employeetracker",
  password: "password",
  port: 5432,
});

export default pool;
