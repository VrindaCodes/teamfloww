import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-10">
        TeamFlow
      </h1>

      <ul className="space-y-5">

        <li>
          <Link
            to="/"
            className="block hover:text-blue-400 transition"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/projects"
            className="block hover:text-blue-400 transition"
          >
            Projects
          </Link>
        </li>

        <li>
          <Link
            to="/tasks"
            className="block hover:text-blue-400 transition"
          >
            Tasks
          </Link>
        </li>

        <li>
          <Link
            to="/chat"
            className="block hover:text-blue-400 transition"
          >
            Chat
          </Link>
        </li>

        <li>
          <Link
            to="/kanban"
            className="block hover:text-blue-400 transition"
          >
            Kanban
          </Link>
        </li>

        {!token && (
          <>
            <li>
              <Link
                to="/login"
                className="block hover:text-blue-400 transition"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                className="block hover:text-blue-400 transition"
              >
                Register
              </Link>
            </li>
          </>
        )}

        {token && (
          <li>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          </li>
        )}

      </ul>
    </div>
  );
}

export default Sidebar;