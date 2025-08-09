import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import JobForm from './JobForm';
import Toast from './Toast';
import { fetchJobs, addJob, updateJob, deleteJob } from '../api/api';

export default function JobBoard({ user }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) {
      loadJobs();
    }
  }, [user]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      showToast('Error fetching jobs', 'error');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleJobSubmit = async (jobData) => {
    try {
      if (editingJob) {
        await updateJob(editingJob._id, jobData);
        showToast('Job updated successfully!');
      } else {
        await addJob(jobData);
        showToast('Job added successfully!');
      }
      setShowJobForm(false);
      setEditingJob(null);
      loadJobs();
    } catch (error) {
      showToast(error.message || 'Error saving job', 'error');
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await deleteJob(jobId);
      showToast('Job deleted successfully!');
      loadJobs();
    } catch (error) {
      showToast(error.message || 'Error deleting job', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Job Applications</h2>

        {/* Show Add Job button only when jobs exist */}
        {user && jobs.length > 0 && (
          <button
            onClick={() => {
              setEditingJob(null);
              setShowJobForm(true);
            }}
            className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            title="Add Job"
          >
            + Add Job
          </button>
        )}
      </header>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>

        
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No Jobs Found
          </h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            You haven’t posted any jobs yet. Start by creating your first job listing so candidates can apply.
          </p>

          
          {user && (
            <button
              onClick={() => {
                setEditingJob(null);
                setShowJobForm(true);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all shadow-md"
            >
              + Create Your First Job
            </button>
          )}
        </div>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </main>
      )}

      {showJobForm && (
        <JobForm
          job={editingJob}
          onSubmit={handleJobSubmit}
          onCancel={() => {
            setShowJobForm(false);
            setEditingJob(null);
          }}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
