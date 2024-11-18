import express from "express";
import { AppointmentController } from "./appointment.controller";

const router = express.Router();

// Create an appointment
router.post('/create', AppointmentController.create);

// Get a single appointment by ID
router.get('/:id', AppointmentController.getSingle);

// Get all appointments
router.get('/', AppointmentController.getAll);

// Update an appointment by ID
router.patch('/:id', AppointmentController.update);

// Delete an appointment by ID
router.delete('/:id', AppointmentController.delete);

export const AppointmentRoutes = router;
