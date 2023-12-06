import { BrowserRouter, Route, Routes } from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContex";
import { HomePage } from "./pages/homePage";
import PostPage from "./pages/postpage";
import { HomePageL } from "./pages/homePage-L";
import ProtectedRoutes from "./ProtectedRoutes";
import NewPost from "./pages/NewPost";


function App() {
  return (
  <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/home" element={<HomePageL/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoutes/>}>
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/new" element={<NewPost />} />
          <Route path="/profile" element={<profilepage />} />
      </Route>
        </Routes>
      </BrowserRouter>
  </AuthProvider>
      
  );
}

export default App;
