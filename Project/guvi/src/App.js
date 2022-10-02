import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {  Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SignUp" element={<SignUp />} />

      </Routes>
    </div>
  );
}
export default App;