import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import AuthLayout from "./layouts/AuthLayout";

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      </Route>
     <Route element={<AuthLayout />}>
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     </Route>
     </Routes>
    </>
  )
}

export default App;