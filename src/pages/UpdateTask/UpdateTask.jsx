import { useQuery } from "@tanstack/react-query";
import { MdUpdate } from "react-icons/md";
import { useParams } from "react-router-dom";

const UpdateTask = () => {
    const {id} = useParams();
  const { data: task, refetch } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`
      );
      return response.data;
    },
  });

  return (
    <div className="hero pt-20 pb-16">
      <div className="lg:w-3/5 w-11/12 mx-auto flex-col">
        <div className="text-center pb-5">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
            Update Task
          </h1>
        </div>

        <div className="bg-base-100/80 shrink-0 shadow-md rounded-md">
          <form className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">
                <span className="font-bold">Task Title</span>
              </label>
              <input
                type="text"
                name="taskTitle"
                defaultValue={task?.Title}
                maxLength={50}
                pattern="^[A-Za-z\s]*$"
                placeholder="Write the task name"
                className="input w-full font-medium"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="fieldset-label">
                <span className="font-bold">Task Description</span>
              </label>
              <textarea
                name="description"
                defaultValue={task?.Description}
                maxLength={200}
                placeholder="Task Description"
                className="textarea w-full font-medium"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="fieldset-label">
                <span className="font-bold">Task Category</span>
              </label>

              <select
                name="category"
                defaultValue={task?.Category}
                className="select select-info cursor-pointer p-2 mb-2"
              >
                <option defaultValue={"Select Category"} disabled>
                  Select Category
                </option>
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </fieldset>

            <div className="mt-1 lg:w-1/4 md:w-2/5 w-11/12">
              <button className="btn bg-indigo-500 border-none text-white/90 hover:bg-indigo-700 font-bold rounded-md flex gap-1 items-center">
                <span className="text-lg">Update Task</span>
                <MdUpdate className="text-xl" />{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
