import express from "express";
import { CalendarAvailabilityController } from "./calenderAvailablity.controller";

const router = express.Router();

// Create a new calendar availability
router.post("/create", CalendarAvailabilityController.create);

// Get calendar availability for a doctor (optionally filter by date)
router.get("/", CalendarAvailabilityController.get);

// Update an existing calendar availability by ID
router.put("/:availabilityId", CalendarAvailabilityController.update);

// Delete a calendar availability by ID
router.delete("/:availabilityId", CalendarAvailabilityController.delete);

export const CalendarAvailabilityRoutes = router;
