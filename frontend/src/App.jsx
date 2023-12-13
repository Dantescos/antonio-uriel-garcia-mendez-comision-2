import { BrowserRouter, Route, Routes } from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContex";
import HomeNoLogeado  from "./pages/homePage-no-logeado";
import  Homepagelogeado  from "./pages/homePage-Logeado";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { PostProvider } from "./context/PostProvider"
import Postpreciso from "./pages/postsEspecifico"
import { CommentProvider } from "./context/CommentProvider"

function App() {
  return (
  <AuthProvider>
       <PostProvider>
       <CommentProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeNoLogeado/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoutes/>}>
      <Route path="/profile" element={< Homepagelogeado  />} />
      <Route path="/profile/post/:id" element={<Postpreciso/>} />
      </Route>
        </Routes>
      </BrowserRouter>
      </CommentProvider>
      </PostProvider>
  </AuthProvider>
      
  );
}

export default App;
