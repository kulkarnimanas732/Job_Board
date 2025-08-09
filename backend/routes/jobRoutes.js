import express from 'express';
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';

const router = express.Router();

import { protect } from '../middlewares/authMiddleware.js';

router.get('/', protect,getJobs); 

router.post('/', protect, addJob); 
router.put('/:id', protect, updateJob); 

router.delete('/:id', protect, deleteJob); 

export default router;
