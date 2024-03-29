import User from "../models/usuarios.modelo.js";
import bcrypt from "bcrypt";
import { createAccessToken } from '../middlewares/auth.js';
import { settingSecretToken } from "../config/config.js";
import jwt from "jsonwebtoken"

const { secret } = settingSecretToken();

export const register = async (req, res) => {
  const { email, password, username, avatarURL } = req.body
  try {
    const userFound = await User.findOne({email})
    if (userFound) return res.status(400).json(["El email ya existe"])
    const passwordHash = await bcrypt.hash(password, 10) 
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      avatarURL,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "El usuario no esta registrado" });
    const matchPassword = await bcrypt.compare(password, userFound.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Password incorrecto", token: null });
    } else {
      const token = await createAccessToken({ id: userFound._id });
      res.cookie("token", token);
      res.json({
        message: "Bienvenido!",
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el inicio de sesión", error });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Hasta Pronto!" });
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    res.json({
      message: "Perfil",
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el perfil", error });
  }
};


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