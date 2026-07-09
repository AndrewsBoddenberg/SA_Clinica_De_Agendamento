const { databaseConnection } = require("./database/connection");

databaseConnection();

const express = require("express");
const app = express();
const port = process.env.port || 3031;
const cors = require("cors")

const pacientesRoute = require("./routes/pacientesRoute");
const agendamentosRoute = require("./routes/agendamentosRoute");
const medicosRoute = require("./routes/medicosRoute");

app.use(express.json());
app.use(cors());

app.use("/pacientes", pacientesRoute);
app.use("/agendamentos", agendamentosRoute);
app.use("/medicos", medicosRoute);

app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`);
});

