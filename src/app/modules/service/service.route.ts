import express from "express";
import { ServiceController } from "./service.controller";

const router = express.Router();

// Route to create a new service
router.post("/create", ServiceController.createService);

// Route to get all services
router.get("/", ServiceController.getAllServices);

// Route to update a service by ID
router.patch("/:id", ServiceController.getServiceById);

// Route to delete a service by ID
router.delete("/:id", ServiceController.deleteService);

export const ServiceRoutes = router;
