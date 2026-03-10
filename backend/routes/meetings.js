import express from 'express';
import {
  createMeeting,
  getMeetings,
  getMeetingsByDay,
  getAllMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting,
} from '../controllers/meetingsController.js';
import { isAuthenticatedHeader } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roleCheck.js';

const router = express.Router();

// All routes require authentication
router.use(isAuthenticatedHeader);

// Sales and Manager routes
router.post('/', createMeeting);
router.get('/', getMeetings);
router.get('/day/:date', getMeetingsByDay);
router.get('/:id', getMeeting);
router.patch('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);

// Manager only routes
router.get('/manager/all', authorizeRole('manager'), getAllMeetings);

export default router;
