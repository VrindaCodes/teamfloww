import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data =
        await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Total Projects</h2>

          <p className="text-3xl font-bold">
            {stats.totalProjects}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Total Tasks</h2>

          <p className="text-3xl font-bold">
            {stats.totalTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Completed Tasks</h2>

          <p className="text-3xl font-bold">
            {stats.completedTasks}
          </p>
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;