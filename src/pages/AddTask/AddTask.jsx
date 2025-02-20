import { IoMdAddCircle } from "react-icons/io";

const AddTask = () => {
  const handleAddTask = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.taskTitle.value;
    const description = form.description.value;
    const dueDate = form.dueDate.value;

    const taskData = {
      title,
      description,
      dueDate,
      timeStamp: new Date().toISOString(),
      status: "",
    };

    console.log(taskData);
  };

  return (
    <div className="hero pt-20 pb-16">
      <div className="lg:w-3/5 w-11/12 mx-auto flex-col">
        <div className="text-center pb-5">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold">
            Add Task
          </h1>
        </div>

        <div className="bg-base-100/80 shrink-0 shadow-md rounded-md">
          <form onSubmit={handleAddTask} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">
                <span className="font-bold">Task Title</span>
              </label>
              <input
                type="text"
                name="taskTitle"
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
                placeholder="Task Description"
                className="textarea w-full font-medium"
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="fieldset-label">
                <span className="font-bold">Due Date</span>
              </label>
              <input
                type="date"
                name="dueDate"
                className="input w-full font-medium"
                required
              />
            </fieldset>

            <div className="mt-6 lg:w-1/4 md:w-2/5 w-11/12">
              <button className="btn bg-indigo-500 border-none text-white/90 hover:btn-primary font-bold rounded-md flex gap-2 items-center">
                <IoMdAddCircle className="text-xl" />{" "}
                <span className="text-lg">Add</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
