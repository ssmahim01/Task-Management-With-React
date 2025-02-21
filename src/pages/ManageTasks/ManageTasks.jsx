import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ManageTasks = () => {
  const { user } = useContext(AuthContext);

  const { data: tasksData = [], refetch } = useQuery({
    queryKey: ["tasksData", user?.uid],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tasks?uid=${user?.uid}`
      );
      return response.data;
    },
  });

  const handleStatusUpdate = async (e, taskId) => {
    const Category = {
      Category: e.target.value,
    };

    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/task-category/${taskId}`,
      Category
    );

    if (response.data.modifiedCount > 0) {
        refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Reorder the task to ${e.target.value}`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleDeleteTask = async (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`);
        if (response.data.deletedCount > 0) {
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Task has been deleted",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <div className="lg:w-[90%] w-11/12 mx-auto pt-20 pb-16">
      <h1 className="font-bold lg:text-4xl md:text-3xl text-2xl pb-5">
        Manage Tasks
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table table-zebra">
          <thead className="border border-neutral-200">
            <tr className="*:text-neutral-200 bg-neutral-700 font-bold">
              <th>Task Title</th>
              <th>Task Description</th>
              <td>Time Stamp</td>
              <td>Category</td>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasksData?.map((task) => {
              return (
                <tr key={task?._id} className="border border-neutral-200">
                  <td className="text-neutral-600 font-semibold">
                    {task?.Title}
                  </td>
                  <td className="text-neutral-600 font-semibold">
                    {task?.Description.slice(0, 40)}...
                  </td>
                  <td className="text-neutral-600 font-semibold">
                    {new Date(task?.TimeStamp).toLocaleString("en-UK")}
                  </td>
                  <td>
                    <select
                      defaultValue={task?.Category}
                      onChange={(e) => handleStatusUpdate(e, task?._id)}
                      className="select select-info select-xs w-full max-w-md *:font-semibold"
                    >
                      <option defaultValue={"Reorder Tasks"} disabled>
                        Reorder Tasks
                      </option>
                      <option value="To-Do">To-Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-neutral btn-sm text-white font-bold">
                      <Link
                        to={`/update-task/${task?._id}`}
                        className="flex gap-2 items-center"
                      >
                        <FaRegEdit className="lg:block hidden" />{" "}
                        <span>Update</span>
                      </Link>
                    </button>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDeleteTask(task?._id)}
                      className="btn btn-error btn-sm text-white font-bold flex gap-2 items-center"
                    >
                      <FaRegTrashCan className="lg:block hidden" />{" "}
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
