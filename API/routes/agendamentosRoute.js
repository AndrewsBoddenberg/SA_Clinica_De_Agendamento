const express = require("express");
const router = express.Router();

const agendamentosController = require("../controllers/agendamentosController");

router.get("/", agendamentosController.getAgendamentos);
router.get("/:id", agendamentosController.getAgendamentosById);
router.post("/", agendamentosController.createAgendamentos);
router.put("/:id", agendamentosController.updateAgendamentos);
router.delete("/:id", agendamentosController.deleteAgendamentos);

module.exports = router;