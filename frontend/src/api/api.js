const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api" 
    : "https://job-board-wbf2.onrender.com/api"; 

const getToken = () => localStorage.getItem("token");


export const fetchJobs = async () => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/jobs`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const addJob = async (jobData) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add job");
  return data;
};

export const updateJob = async (id, jobData) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update job");
  return data;
};

export const deleteJob = async (id) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/jobs/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete job");
  return data;
};


export const loginUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

export const registerUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};
