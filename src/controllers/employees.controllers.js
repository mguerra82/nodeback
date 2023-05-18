import { pool } from "../db/db.js"

export const getEmployees =async (req, res)=> {
    const [rows] = await pool.query('select * from employee')
    res.json(rows)
}


export const getEmployeesId = async(req, res)=>{
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])

    if(rows.length <= 0 ) return res.status(404).json({
        mensaje: 'Empleado no existe.'
    })

    console.log('PARAMETROS:... ',req.params)
    res.json(rows[0])
}

export const postEmployees = async(req, res) =>{
    const {nombre, salario} = req.body
    const [rows] = await pool.query('INSERT INTO employee( nombre, salario) VALUES (?,?)', [nombre, salario])
    console.log(req.body)
/**
 * Obtener return registro insertado.
 */
    res.send(
        {
        id: rows.insertId,
        nombre,
        salario
    })
}

export const deleteEmployeesId = async(req, res)=>{
    const [rows] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])

    console.log(rows)
    if(rows.affectedRows <= 0 ) return res.status(404).json({
        mensaje: 'Empleado no existe.'
    })

    console.log('PARAMETROS:... ',req.params)
    res.send({ "mensaje": "Empleado eliminado con exito."})
}

export const putEmployees = async(req, res) => {
    const {id} = req.params
    const {nombre, salario} = req.body
    const [result] = await pool.query('UPDATE employee SET nombre = IFNULL(?,nombre), salario= IFNULL(?,salario) WHERE id= ?', [ nombre, salario, id])
    
    if(result.affectedRows == 0) return res.status(404).json({
        mensaje: "Empleado no existe"
    })
    console.log(result);
    
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])

    res.json(rows[0])
}