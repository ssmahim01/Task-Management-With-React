import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      </Route>
     </Routes>
    </>
  )
}

export default App;