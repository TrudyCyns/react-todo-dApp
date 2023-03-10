import { Formik } from "formik";
import { clearTasks, deleteTask, getTasks, setTask } from "./contract";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    async function getTaskList() {
      const returnedTasks = await getTasks();
      if (returnedTasks.length > 0) {
        setTasks(returnedTasks);
      }
    }
    getTaskList();
  }, [tasks]);

  return (
    <div className="container p-5">
      <p className="h3 text-center">To Do dApp</p>
      <p className="text-muted text-center mb-3">
        Add, view and delete your tasks.
      </p>
      <Formik
        initialValues={{ task: "" }}
        onSubmit={async (values) => {
          values.task === ""
            ? alert("Please enter a task")
            : await setTask(values.task);
        }}
      >
        {(props) => (
          <form className="row g-3 p-3" onSubmit={props.handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="task" className="col-sm-1 col-form-label">
                Task
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="task"
                  name="task"
                  placeholder="Add a task here..."
                  onChange={props.handleChange}
                  value={props.values.task}
                />
              </div>
              <button
                className="btn btn-primary col-sm-3 fw-bold"
                type="submit"
              >
                Create Task
              </button>
            </div>
          </form>
        )}
      </Formik>

      <div className="row justify-content-end me-4">
        <button
          className="btn btn-danger col-sm-3"
          onClick={async () => {
            await clearTasks();
            setTasks(null);
          }}
        >
          Clear All Tasks
        </button>
      </div>

      <p className="h4">Tasks</p>
      {tasks ? (
        <table className="table p-3">
          <tbody>
            {tasks.map((task, index) =>
              task === "" ? null : (
                <tr key={index}>
                  <td>{task}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={async () => {await deleteTask(task)}}
                    >
                      Delete Task
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-danger">
          There are no tasks. Create some tasks.
        </div>
      )}
    </div>
  );
}

export default App;
