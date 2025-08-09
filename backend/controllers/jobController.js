// // controllers/jobController.js
// import Job from '../models/Job.js';

// export const getJobs = async (req, res) => {
//   const jobs = await Job.find().sort({ createdAt: -1 });
//   res.json(jobs);
// };

// export const addJob = async (req, res) => {
//   const { title, company, location, description, salary, applicationLink } = req.body;

//   if (!title || !company || !location || !description) {
//     return res.status(400).json({ message: 'Required fields are missing' });
//   }

//   // Optional: Validate applicationLink
//   if (applicationLink && !/^https?:\/\/\S+$/.test(applicationLink)) {
//     return res.status(400).json({ message: 'Invalid application link URL' });
//   }

//   const job = await Job.create({
//     title,
//     company,
//     location,
//     description,
//     salary,
//     applicationLink,
//   });

//   res.status(201).json(job);
// };

// export const updateJob = async (req, res) => {
//   const updatedData = req.body;

//   if (!updatedData.title || !updatedData.company || !updatedData.location || !updatedData.description) {
//     return res.status(400).json({ message: 'Required fields are missing' });
//   }

//   if (updatedData.applicationLink && !/^https?:\/\/\S+$/.test(updatedData.applicationLink)) {
//     return res.status(400).json({ message: 'Invalid application link URL' });
//   }

//   const job = await Job.findByIdAndUpdate(req.params.id, updatedData, {
//     new: true,
//   });

//   res.json(job);
// };

// export const deleteJob = async (req, res) => {
//   const job = await Job.findById(req.params.id);
//   if (!job) return res.status(404).json({ message: 'Job not found' });

//   await Job.deleteOne({ _id: req.params.id });
//   res.json({ message: 'Job deleted' });
// };
import Job from '../models/Job.js';

// Get all jobs for the logged-in user
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching jobs' });
  }
};

// Add a job for the logged-in user
export const addJob = async (req, res) => {
  const { title, company, location, description, salary, applicationLink } = req.body;

  if (!title || !company || !location || !description) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  if (applicationLink && !/^https?:\/\/\S+$/.test(applicationLink)) {
    return res.status(400).json({ message: 'Invalid application link URL' });
  }

  try {
    const job = await Job.create({
      user: req.user.id,
      title,
      company,
      location,
      description,
      salary,
      applicationLink,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error adding job' });
  }
};

// Update a job if owned by the logged-in user
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this job' });
    }

    const { title, company, location, description, salary, applicationLink } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    if (applicationLink && !/^https?:\/\/\S+$/.test(applicationLink)) {
      return res.status(400).json({ message: 'Invalid application link URL' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { title, company, location, description, salary, applicationLink },
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating job' });
  }
};

// Delete a job if owned by the logged-in user
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting job' });
  }
};
