import { pool } from '../db/db.js'

export const getIndex = async (req, res) => {
    const [result] = await pool.query('select 1+1 as resutl')
    res.json(result)
}