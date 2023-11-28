import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>home page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts" element={<h1>Posts</h1>} />
          <Route path="/add-post" element={<h1>Nuevo Posts</h1>} />
          <Route path="/post/:id" element={<h1>editar posts</h1>} />
          <Route path="/profile" element={<h1>Perfil</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
