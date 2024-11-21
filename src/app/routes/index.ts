import express from 'express';
import { AppointmentRoutes } from '../modules/appointment/appointment.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CalendarAvailabilityRoutes } from '../modules/calenderAvailablity/calenderAvailablity.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { MedicalHistoryRoutes } from '../modules/medicalHistory/medicalHistory.route';
import { PatientRoutes } from '../modules/patient/patient.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { ServiceRoutes } from '../modules/service/service.route';


const router = express.Router();

const moduleRoutes = [

    { path: '/auth', route: AuthRoutes },
    { path: '/profile', route: ProfileRoutes },
    { path: '/doctor', route: DoctorRoutes },
    { path: '/patient', route: PatientRoutes },
    { path: '/medicalHistory', route: MedicalHistoryRoutes },
    { path: '/calenderAvailability', route: CalendarAvailabilityRoutes },
    { path: '/service', route: ServiceRoutes },
    { path: '/appointment', route: AppointmentRoutes },
    { path: '/payment', route: PaymentRoutes },


];

//configure the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;