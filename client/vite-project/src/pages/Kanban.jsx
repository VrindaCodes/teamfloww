import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getTasks,
  updateTask,
} from "../services/taskService";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function Kanban() {
  const [tasks, setTasks] = useState([]);

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

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {
      await updateTask(taskId, {
        status: newStatus,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const todoTasks = tasks.filter(
    (task) => task.status === "To Do"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "Done"
  );

  const columns = {
    "To Do": todoTasks,
    "In Progress": progressTasks,
    Done: doneTasks,
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Kanban Board
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-3 gap-6">

          {Object.entries(columns).map(
            ([columnId, columnTasks]) => (
              <Droppable
                key={columnId}
                droppableId={columnId}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 p-4 rounded-xl min-h-[500px]"
                  >
                    <h2 className="font-bold text-xl mb-4">
                      {columnId}
                    </h2>

                    {columnTasks.map(
                      (task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-lg shadow mb-3"
                            >
                              <h3 className="font-semibold">
                                {task.title}
                              </h3>

                              <p className="text-gray-500 text-sm">
                                {task.description}
                              </p>

                              <span className="inline-block mt-2 bg-red-200 px-2 py-1 rounded text-sm">
                                {task.priority}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      )
                    )}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )
          )}

        </div>
      </DragDropContext>
    </MainLayout>
  );
}

export default Kanban;