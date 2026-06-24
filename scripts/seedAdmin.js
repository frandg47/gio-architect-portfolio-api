require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userSchema");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      dbName: "gioArquitecturaDB",
    });

    const existingAdmin = await User.findOne({ email: "admin@gio.com" });
    if (existingAdmin) {
      console.log("El admin ya existe.");
      process.exit(0);
    }

    const admin = new User({
      email: "admin@gio.com",
      password: "admin123",
      role: "admin",
    });

    await admin.save();
    console.log("Admin creado: admin@gio.com / admin123");
    process.exit(0);
  } catch (error) {
    console.error("Error al crear admin:", error);
    process.exit(1);
  }
};

seedAdmin();
