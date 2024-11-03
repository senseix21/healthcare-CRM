import express from "express";
import { DoctorController } from "./doctor.controller";

const router = express.Router();

router.post('/create', DoctorController.create);
router.get('/', DoctorController.get);
router.patch('/:id', DoctorController.update);
router.delete('/:id', DoctorController.deleteRecord);

export const DoctorRoutes = router;