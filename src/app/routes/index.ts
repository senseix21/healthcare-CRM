import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CalendarAvailabilityRoutes } from '../modules/calenderAvailablity/calenderAvailablity.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { MedicalHistoryRoutes } from '../modules/medicalHistory/medicalHistory.route';
import { ProfileRoutes } from '../modules/profile/profile.route';


const router = express.Router();

const moduleRoutes = [

    { path: '/auth', route: AuthRoutes },
    { path: '/profile', route: ProfileRoutes },
    { path: '/doctor', route: DoctorRoutes },
    { path: '/medicalHistory', route: MedicalHistoryRoutes },
    { path: '/calenderAvailability', route: CalendarAvailabilityRoutes }


];

//configure the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;