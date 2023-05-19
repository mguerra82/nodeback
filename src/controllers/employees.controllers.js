import { parse } from "dotenv"
import { response } from "express"
import { pool } from "../db/db.js"

export const getEmployees =async (req, res)=> {
   try {
   
    // throw new Error('DB Error')
    const [rows] = await pool.query('select * from employee')
    res.json(rows)

   } catch (error) {
    return res.status(500).json({ mensje: 'Existe un error en el servidor'})
   }
}

export const getPilotos =async (req, res)=> {
    try {
    
    // throw new Error('DB Error')
    //const [rows] = await pool.query('select * from employee')
    // let sql = 'call sp_listarPiloto(@p_codigo, @p_mensaje)';
    let sql = 'call sp_listarPiloto(@p_codigo, @p_mensaje)';
    const [rows] = await pool.query(`call sp_listarPiloto(@p_codigo, @p_mensaje)`)
    console.log('RES:....')
    res.json(rows)
 
    } catch (error) {
     return res.status(500).json({ mensje: 'Existe un error en el servidor', error: error})
    }
 }
 

export const getEmployeesId = async(req, res)=>{
    try {
        
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])

        if(rows.length <= 0 ) return res.status(404).json({
            mensaje: 'Empleado no existe.'
        })

        console.log('PARAMETROS:... ',req.params)
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({ mensaje: 'Existe un error en el servidor'})
    }
}

export const postEmployees = async(req, res) =>{
 try {
    
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

 } catch (error) {
    return res.status(500).json({ mensaje: 'Existe un error en el servidor'})
 }
}

export const deleteEmployeesId = async(req, res)=>{
   try {
    const [rows] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])

    console.log(rows)
    if(rows.affectedRows <= 0 ) return res.status(404).json({
        mensaje: 'Empleado no existe.'
    })

    console.log('PARAMETROS:... ',req.params)
    res.send({ "mensaje": "Empleado eliminado con exito."})

   } catch (error) {
    return res.status(500).json({ mensaje: 'Existe un error en el servidor'})
   }
}

export const patchEmployees = async(req, res) => {
    const {id} = req.params
    const {nombre, salario} = req.body
   
    try {
        
        const [result] = await pool.query('UPDATE employee SET nombre = IFNULL(?,nombre), salario= IFNULL(?,salario) WHERE id= ?', [ nombre, salario, id])
    
        if(result.affectedRows == 0) return res.status(404).json({
            mensaje: "Empleado no existe"
        })
        //console.log(result);
        
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ mensaje: 'Existe un error en el servidor'})
    }
}