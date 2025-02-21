import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaCalendarWeek } from "react-icons/fa";
import { MdDescription, MdTitle } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const Tasks = () => {
  const { user } = useContext(AuthContext);

  const {
    data: tasks = [],
    refetch,
    isPending,
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
  
    // Find the moved task
    const movedTask = updatedTasks[source.index];
  
    // Remove the task from its original position
    updatedTasks.splice(source.index, 1);
  
    // Insert the task at its new position
    updatedTasks.splice(destination.index, 0, movedTask);
  
    // Update the task's category and index
    movedTask.Category = destination.droppableId;
    
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${movedTask._id}`,
        {
          Category: movedTask.Category,
          newIndex: destination.index, // Send the new position to backend
        }
      );
  
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Task Moved Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
  
        // Refetch tasks from the backend to reflect the correct order
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

  if (isPending) return <Loading />;

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
                          key={task?._id}
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
                              <div className="flex justify-between items-center mb-1">
                                <img
                                  src={user?.photoURL}
                                  alt={user?.displayName}
                                  className="w-10 h-10 rounded-full avatar border-4 border-indigo-500"
                                  referrerPolicy="no-referrer"
                                />

                                <h4 className="text-base text-white/90 font-semibold">
                                  {user?.displayName}
                                </h4>
                              </div>
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
