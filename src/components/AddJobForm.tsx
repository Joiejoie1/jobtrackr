import { useState } from "react";

type Job = {
  company: string;
  role: string;
  status: string;
};

function AddJobForm({ onAdd }: { onAdd: (job: Job) => void }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !role) return;

    onAdd({ company, role, status });

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Job</h2>

      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
      </select>

      <button type="submit">Add Job</button>
    </form>
  );
}

export default AddJobForm;