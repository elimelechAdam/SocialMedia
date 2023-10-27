import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { ProtectedRoutes } from "./pages/ProtectedRoute";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="homepage" element={<Homepage />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
