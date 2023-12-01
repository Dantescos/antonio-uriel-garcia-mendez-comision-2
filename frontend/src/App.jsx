import { BrowserRouter,Router, Route, Routes } from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContex";
import { HomePage } from "./pages/homePage";
import { Postspage } from "./pages/postpage";


function App() {
  return (
  <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts" element={<Postspage />} />
          <Route path="/profile" element={<profilepage />} />
        </Routes>
      </BrowserRouter>
  </AuthProvider>
      
  );
}

export default App;
