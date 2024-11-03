import express from "express";
import { ProfileController } from "./profile.controller";

const router = express.Router();

router.post('/create', ProfileController.create);
router.get('/', ProfileController.get);
router.patch('/:id', ProfileController.update);
router.delete('/:id', ProfileController.deleteRecord);

export const ProfileRoutes = router;
