import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import AuthLayout from "./layouts/AuthLayout";
import AddTask from "./pages/AddTask/AddTask";
import PrivateRoute from "./routes/PrivateRoute";
import ManageTasks from "./pages/ManageTasks/ManageTasks";
import UpdateTask from "./pages/UpdateTask/UpdateTask";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/add-task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
          <Route path="/manage-tasks" element={<PrivateRoute><ManageTasks /></PrivateRoute>} />
          <Route path="/update-task" element={<PrivateRoute><UpdateTask /></PrivateRoute>} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
