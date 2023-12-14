import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContex";
import HomeNoLogeado from "./pages/homePage-no-logeado";
import Homepagelogeado from "./pages/homePage-Logeado";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { PostProvider } from "./context/PostProvider";
import Postpreciso from "./pages/postsEspecifico";
import { CommentProvider } from "./context/CommentProvider";

function App() {
  return (
    // Proveedor de autenticación para todo el árbol de componentes
    <AuthProvider>
      {/* Proveedor de publicaciones */}
      <PostProvider>
        {/* Proveedor de comentarios */}
        <CommentProvider>
          {/* Enrutador principal */}
          <BrowserRouter>
            {/* Definición de rutas */}
            <Routes>
              {/* Página principal para usuarios no autenticados */}
              <Route path="/" element={<HomeNoLogeado />} />
              {/* Página de inicio de sesión */}
              <Route path="/login" element={<LoginPage />} />
              {/* Página de registro */}
              <Route path="/register" element={<RegisterPage />} />
              {/* Rutas protegidas para usuarios autenticados */}
              <Route element={<ProtectedRoutes />}>
                {/* Página de perfil para usuarios autenticados */}
                <Route path="/profile" element={<Homepagelogeado />} />
                {/* Página de la publicación específica */}
                <Route path="/profile/post/:id" element={<Postpreciso />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CommentProvider>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
