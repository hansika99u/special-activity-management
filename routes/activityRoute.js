import express from 'express';
import { createActivity, getPendingActivities, approveActivity, getApprovedActivities, declineActivity, filterActivities } from '../controllers/activityController.js';

const router = express.Router();

// Routes
router.get('/', getApprovedActivities);
router.post('/', createActivity);
router.put('/approve/:id', approveActivity);
router.put('/decline/:id', declineActivity);
router.get('/approved', getApprovedActivities);
router.get('/pending', getPendingActivities);
router.get('/filter', filterActivities);

export default router;