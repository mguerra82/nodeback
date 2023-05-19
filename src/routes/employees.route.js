import { Router } from "express";
import { 
    getEmployees, postEmployees, patchEmployees, deleteEmployeesId, getEmployeesId,
    getPilotos

} from '../controllers/employees.controllers.js'

const router = Router()

router.get('/employees', getEmployees )

router.get('/employees/:id', getEmployeesId )

router.post('/employees', postEmployees)

router.patch('/employees/:id', patchEmployees)

router.delete('/employees/:id', deleteEmployeesId)

router.get('/transporte', getPilotos)

export default router