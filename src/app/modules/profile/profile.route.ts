import express from "express";
import { ProfileController } from "./profile.controller";

const router = express.Router();

router.post('/create', ProfileController.create);
router.get('/', ProfileController.get)

export const ProfileRoutes = router;
