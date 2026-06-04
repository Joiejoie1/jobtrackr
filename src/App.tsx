import { useState, useEffect } from "react";
import AddJobForm from "./components/AddJobForm";

type Job = {
  company: string;
  role: string;
  status: string;
};

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState("All");

  // ✅ Load from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job: Job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  const deleteJob = (index: number) => {
    setJobs((prevJobs) => prevJobs.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          💼 JobTrackr
        </h1>

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <AddJobForm onAdd={addJob} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Job Applications
          </h2>

          {/* 🔢 Stats Bar */}
          <div className="flex gap-6 text-sm mb-4 px-2">
            
            <span>
              Applied: {jobs.filter(j => j.status === "Applied").length}
            </span>
            <span>
              Interview: {jobs.filter(j => j.status === "Interview").length}
            </span>
            <span>
              Rejected: {jobs.filter(j => j.status === "Rejected").length}
            </span>
          </div>

          {/* 🔍 Filter Buttons */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {["All", "Applied", "Interview", "Rejected"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded text-sm ${
                  filter === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* 📋 Job List */}
          {jobs.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No job applications yet. Start by adding one 🚀
            </p>
          ) : (
            <div className="space-y-3">
              {jobs
                .filter((job) => filter === "All" || job.status === filter)
                .map((job, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm"
                  >
                    <div>
                      <p className="font-medium">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.role}</p>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {job.status}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteJob(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ❌
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;