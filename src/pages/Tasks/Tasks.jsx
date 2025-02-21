import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaCalendarWeek } from "react-icons/fa";
import { MdDescription, MdTitle } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Tasks = () => {
  const { user } = useContext(AuthContext);

  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", user?.uid],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tasks?uid=${user?.uid}`
      );
      return response.data;
    },
  });

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTasks = [...tasks];

    const movedTask = updatedTasks[source.index];
    if (source.droppableId !== destination.droppableId) {
      movedTask.category = destination.droppableId;
    }

    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${movedTask._id}`,
        { Category: movedTask.category }
      );

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Moved the task",
          showConfirmButton: false,
          timer: 3000,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="lg:w-[90%] w-11/12 mx-auto">
      <h1 className="md:text-4xl text-3xl font-bold mb-3">Task Board</h1>

      {/* Task Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="card bg-neutral-800 shadow-md p-4 rounded-md"
                >
                  <h2 className="text-xl font-bold text-white">{category}</h2>
                  <div>
                    {tasks
                      .filter((task) => task?.Category === category)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task?._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card-body space-y-1 mt-4 border border-neutral-300 hover:scale-105 hover:shadow-xl rounded-md p-3"
                            >
                              <h3 className="text-white/90 font-bold flex gap-2 items-center">
                                <MdTitle className="text-lg" />{" "}
                                <span className="text-base">{task?.Title}</span>
                              </h3>
                              <p className="text-white/80 font-semibold flex gap-2 items-center">
                                <MdDescription className="text-lg" />
                                <span className="text-sm">
                                  {task?.Description}
                                </span>
                              </p>

                              <p className="flex gap-2 items-center font-semibold text-white/80">
                                <FaCalendarWeek className="text-base" />{" "}
                                <span className="text-sm">
                                  {new Date(task?.TimeStamp).toLocaleString(
                                    "en-UK"
                                  )}
                                </span>
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
