import User from "../models/usuarios.modelo.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const foundUser = await User.findOne({email})
    if (foundUser) return res.status(400).json({message:"el email ya existe"})
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      
    });
  } catch (error) {
    res.status(500)
    .json({ message: "Error al crear usuario", error: error.message });
  }
};




export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json([ "usuario no hallado" ]);
    
    const isMatch = await bcrypt.compare(password, userFound.password);
  
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

      const token = await createAccessToken({ id: userFound.id });
      res.cookie("token", token);
      res.json({
      username: userFound.username,
    });
  } catch (error) {
    res .status(500)
    .json({ message: "Error al crear usuario", error: error.message });
  }
};




export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Hasta pronto!" });
};




export const profile = async (req, res) => {
  try{ 
  const userFound = await User.findById(req.user.id);
  if (!userFound) 
  return res.status(400).json({ message: "usuario no  encontrado" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};


const { secret } = TOKEN_SECRET;
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, secret, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};