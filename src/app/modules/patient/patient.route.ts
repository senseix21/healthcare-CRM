import express from "express";
import { PatientController } from "./patient.controller";

const router = express.Router();

router.post('/create', PatientController.create);
router.get('/', PatientController.get);
router.patch('/:id', PatientController.update);
router.delete('/:id', PatientController.deleteRecord);

export const PatientRoutes = router;