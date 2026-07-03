const { databaseConnection } = require("./database/connection");

databaseConnection();

const express = require("express");
const app = express();
const port = process.env.port || 3031;

const pacienteRoute = require("./routes/pacienteRoute");

app.use(express.json());

app.use("/pacientes", pacienteRoute);

app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`);
});

