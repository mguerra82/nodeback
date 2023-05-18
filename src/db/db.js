import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: '159.89.53.199',
    user: 'root',
    password: 'Manager00!',
    port: 3306,
    database: 'blog' 
})
