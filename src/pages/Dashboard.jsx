import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    type: "",
    duration: "",
    intensity: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/workouts`, {
        headers: { Authorization: token },
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error loading workouts", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/workouts`,
        {
          ...form,
          duration: Number(form.duration),
        },
        {
          headers: { Authorization: token },
        }
      );
      fetchWorkouts();
      setForm({ type: "", duration: "", intensity: "", notes: "" });
    } catch (error) {
      console.error("Error saving workout", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">FitTrack Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Log a Workout</h2>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Workout Type (e.g., Cardio, Strength)"
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="Duration (minutes)"
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <input
            name="intensity"
            value={form.intensity}
            onChange={handleChange}
            placeholder="Intensity (Low, Medium, High)"
            className="w-full mb-3 p-2 border rounded"
            required
          />
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Additional notes"
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Workout"}
          </button>
        </form>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Workouts</h2>
          {workouts.length === 0 ? (
            <p className="text-gray-500">No workouts logged yet.</p>
          ) : (
            <ul className="space-y-4">
              {workouts.map((w, index) => (
                <li key={index} className="border-b pb-2">
                  <strong>{w.type}</strong> - {w.duration} min - {w.intensity}
                  <p className="text-sm text-gray-500">{w.notes}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Training Assistant (Bot)</h2>
        <p className="text-sm text-gray-600 mb-2">
          Coming soon: Ask the bot about training plans, nutrition, and recovery tips.
        </p>
        <input
          type="text"
          disabled
          placeholder="e.g., How can I improve my endurance?"
          className="w-full p-2 border rounded text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default Dashboard;
