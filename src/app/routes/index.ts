import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { ProfileRoutes } from '../modules/profile/profile.route';


const router = express.Router();

const moduleRoutes = [

    { path: '/auth', route: AuthRoutes },
    { path: '/profile', route: ProfileRoutes },
    { path: '/doctor', route: DoctorRoutes }

];

//configure the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;