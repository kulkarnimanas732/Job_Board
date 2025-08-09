// // models/Job.js
// import mongoose from 'mongoose';

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   location: { type: String, required: true },
//   description: { type: String, required: true },
//   salary: { type: String },
//   applicationLink: { type: String }, // External apply URL
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Job', jobSchema);
// models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: { // 🔹 Reference to the user who created this job
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String },
  applicationLink: { type: String }, // External apply URL
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Job', jobSchema);
