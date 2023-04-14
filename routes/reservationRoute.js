import express from 'express';
import { getAllReservations, createReservation, deleteReservation } from '../controllers/reservationController.js';

const router = express.Router();



router.get('/', getAllReservations);
router.post('/', createReservation);
router.get('/delete', deleteReservation);

export default router;