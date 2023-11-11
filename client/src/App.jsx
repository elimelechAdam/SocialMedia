import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { ProtectedRoutes } from "./pages/ProtectedRoute";
import { Homepage } from "./pages/Homepage";
import { UserProvider } from "./context/UserProvider";

function App() {
  //need to change to useContext
  // const toekn = localStorage.getItem("userToken");
  // console.log(`toekn`, toekn);
  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="homepage" element={<Homepage />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
