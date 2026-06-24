// routes/index.js
const router = require("express").Router();
const upload = require("../middlewares/multer");
const authMiddleware = require("../middlewares/auth");
const { createProject, getAllProjects, getProjectById, putProject, deleteProject, updateCoverImage, updateGallery } = require("../controllers/projectController");
const { sendFormContact } = require("../controllers/formController");
const { login } = require("../controllers/authController");


//auth
router.post("/auth/login", login);

//proyectos (públicos)
router.get("/proyectos", getAllProjects);
router.get("/proyectos/:id", getProjectById);

//proyectos (protegidos)
router.post(
  "/crear/proyecto",
  authMiddleware,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "gallery", maxCount: 20 }
  ]),
  createProject
);
router.put(
  "/editar/proyecto/:id",
  authMiddleware,
  putProject
);
router.put(
  "/editar/proyecto/:id/actualizar-galeria",
  authMiddleware,
  upload.fields([
    { name: "gallery", maxCount: 20 }
  ]),
  updateGallery
);
router.put(
  "/editar/proyecto/:id/actualizar-portada",
  authMiddleware,
  upload.single("coverImage"),
  updateCoverImage
);
router.delete("/eliminar/proyecto/:id", authMiddleware, deleteProject);


//contacto
router.post("/enviar/formulario", sendFormContact)

module.exports = router;
