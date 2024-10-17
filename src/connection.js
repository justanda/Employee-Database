"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var Pool = pg_1.default.Pool;
var pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "employeetracker",
    password: "password",
    port: 5432,
});
exports.default = pool;
