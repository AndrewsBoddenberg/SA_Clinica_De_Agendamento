const express = require("express");
const router = express.Router();

const horariosController = require("../controllers/horariosController");

router.get("/", horariosController.getHorarios);
router.get("/medico/:medicoId", horariosController.getHorariosByMedico);
router.post("/", horariosController.createHorarios);
router.put("/:id", horariosController.updateHorarios);
router.delete("/:id", horariosController.deleteHorarios);

module.exports = router;