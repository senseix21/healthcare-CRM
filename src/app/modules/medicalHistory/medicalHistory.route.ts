import express from "express";
import { MedicalHistoryController } from "./medicalHistory.controller";

const router = express.Router();

router.post('/create', MedicalHistoryController.create);
router.get('/', MedicalHistoryController.get);
router.patch('/:id', MedicalHistoryController.update);
router.delete('/:id', MedicalHistoryController.deleteRecord);

export const MedicalHistoryRoutes = router;