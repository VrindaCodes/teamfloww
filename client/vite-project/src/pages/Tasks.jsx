import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createTask({
        title,
        description,
        status: "To Do",
        priority,
      });

      setTitle("");
      setDescription("");
      setPriority("Medium");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      await updateTask(id, {
        status: newStatus,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Tasks
      </h1>

      <div className="bg-white p-5 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          className="border p-2 w-full mb-3 rounded"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Task Description"
          className="border p-2 w-full mb-3 rounded"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
          className="border p-2 w-full mb-3 rounded"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          onClick={handleCreateTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">
                {task.title}
              </h3>

              <p className="text-gray-500">
                {task.description}
              </p>
            </div>

            <div className="text-right">
              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    task._id,
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded mb-2"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <span className="block bg-red-200 px-3 py-1 rounded mb-2">
                {task.priority}
              </span>

              <button
                onClick={() =>
                  handleDeleteTask(task._id)
                }
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Tasks;