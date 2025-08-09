
import React from 'react';
import { Edit2, Trash2, Building2, MapPin, DollarSign, ExternalLink } from 'lucide-react';

export default function JobCard({ job, user, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200 h-full flex flex-col">
     
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
        {user && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(job)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Job"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(job._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Job"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Building2 size={16} className="mr-2" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin size={16} className="mr-2" />
          <span>{job.location}</span>
        </div>
        {job.salary && (
          <div className="flex items-center text-gray-600">
            <DollarSign size={16} className="mr-2" />
            <span>{job.salary}</span>
          </div>
        )}
      </div>

 
      <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">{job.description}</p>

    
      <div className="flex justify-between items-center mt-auto">
        <span className="text-sm text-gray-500">
          Posted: {new Date(job.createdAt).toLocaleDateString()}
        </span>
        {job.applicationLink && (
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Now <ExternalLink size={16} className="ml-2" />
          </a>
        )}
      </div>
    </div>
  );
}

