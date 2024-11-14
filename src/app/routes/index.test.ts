import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { MedicalHistoryRoutes } from '../modules/medicalHistory/medicalHistory.route';
import { ProfileRoutes } from '../modules/profile/profile.route';

describe('Router Configuration', () => {
    let app: express.Application;

    beforeEach(() => {
        app = express();
        const router = express.Router();

        const moduleRoutes = [
            { path: '/auth', route: AuthRoutes },
            { path: '/profile', route: ProfileRoutes },
            { path: '/doctor', route: DoctorRoutes },
            { path: '/medicalHistory', route: MedicalHistoryRoutes },
            { path: '/calenderAvailablity', route: MedicalHistoryRoutes }
        ];

        moduleRoutes.forEach(route => router.use(route.path, route.route));
        app.use(router);
    });
});
