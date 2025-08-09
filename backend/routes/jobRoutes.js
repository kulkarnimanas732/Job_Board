// routes/jobRoutes.js
import express from 'express';
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

const router = express.Router();

import { protect } from '../middlewares/authMiddleware.js';

router.get('/', protect,getJobs); // public

router.post('/', protect, addJob); // only logged-in users can post

router.put('/:id', protect, updateJob); // only logged-in users can update

router.delete('/:id', protect, deleteJob); // only logged-in users can delete

export default router;
