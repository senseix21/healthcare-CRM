import express from "express";
import { ProfileController } from "./profile.controller";

const router = express.Router();

router.post('/create', ProfileController.create);

export const ProfileRoutes = router;
