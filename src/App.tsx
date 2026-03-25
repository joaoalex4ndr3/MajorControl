import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
