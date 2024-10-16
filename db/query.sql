const pool = require('./db');

function viewDepartments() {
  pool.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    promptUser();
  });
}
