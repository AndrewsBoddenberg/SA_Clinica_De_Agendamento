const { databaseConnection } = require("./database/connection");

databaseConnection();

const express = require("express");
const app = express();
const port = process.env.port || 3031;
const cors = require("cors")

const pacienteRoute = require("./routes/pacientesRoute");
const agendamentosRoute = require("./routes/agendamentosRoutes");
const medicosRoute = require("./routes/medicosRoutes");

app.use(express.json());
app.use(cors());

app.use("/pacientes", pacienteRoute);
app.use("/agendamentos", agendamentosRoute);
app.use("/medicos", medicosRoute);

app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`);
});

