import { Router } from "express";
import { 
    getEmployees, postEmployees, putEmployees, deleteEmployeesId, getEmployeesId

} from '../controllers/employees.controllers.js'

const router = Router()

router.get('/employees', getEmployees )

router.get('/employees/:id', getEmployeesId )

router.post('/employees', postEmployees)

router.patch('/employees/:id', putEmployees)

router.delete('/employees/:id', deleteEmployeesId)

export default router