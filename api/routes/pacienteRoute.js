const express = require("express");
const router = express.Router();

const pacientesController = require("../controllers/pacienteController");

router.get("/", pacientesController.getItems);

router.get("/:id", pacientesController.getItemsById);

router.delete("/:id", pacientesController.deleteItem);

module.exports = router; 