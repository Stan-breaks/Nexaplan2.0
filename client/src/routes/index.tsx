import { Route, Routes } from "react";
import Home from "../pages/Home";
import Landing from "../pages/Landing";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
