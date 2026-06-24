const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "gio-backend-secret-key";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: "Email y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      mensaje: "Login exitoso",
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

module.exports = { login };
