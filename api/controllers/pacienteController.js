const { pool } = require("../database/connection");

async function getItems(req, res) {
    try {
        const [pacientes] = await pool.query(`select * from pacientes;`);

        return res.status(200).json(pacientes);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro getting pacientes"
        })
    }
};

async function getItemsById(req, res) {
    const { id } = req.params;

    if (!id || id <= 0) {
        return res.status(400).json({
            error: "Invalid Id"
        });
    }

    try {
        const [product] = await pool.query(`select * from paciente where id = ?;`, [id]);
        return res.status(200).json(product[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro getting pacientes"
        })
    }
};

async function createItems(req, res) {
    try {

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro getting pacientes"
        })
    }
};

async function updateItem(req, res) {
    try {

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro getting pacientes"
        })
    }
};

async function deleteItem(req, res) {
    const { id } = req.params;

    if (!id || id <= 0) {
        return res.status(400).json({
            error: "Invalid Id"
        });
    }

    try {
        const [product] = await pool.query(`delete from paciente where id = ?;`, [id]);
        return res.status(200).json({
            mensagem: "Paciente deletado com sucesso!"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro getting pacientes"
        })
    }
};

module.exports = {
    getItems,
    getItemsById,
    createItems,
    updateItem,
    deleteItem
}