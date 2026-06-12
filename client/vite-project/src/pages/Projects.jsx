import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  getProjects,
  createProject,
} from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProject = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await createProject({
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      <div className="bg-white p-5 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create Project
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          className="border p-2 w-full mb-3 rounded"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Project Description"
          className="border p-2 w-full mb-3 rounded"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={handleCreateProject}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Project
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="font-bold text-lg">
              {project.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Projects;