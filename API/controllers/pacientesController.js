const { pool } = require("../database/connection");

async function getPacientes(req, res) {
    try {
        const [pacientes] = await pool.query(`SELECT * FROM pacientes;`);
        return res.status(200).json(pacientes);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao buscar pacientes"
        });
    }
}

async function getPacientesById(req, res) {
    const { id } = req.params;

    if (!id || id <= 0) {
        return res.status(400).json({
            error: "Id inválido"
        });
    }

    try {
        const [pacientes] = await pool.query(`SELECT * FROM pacientes WHERE idpacientes = ?;`, [id]);
        
        if (pacientes.length === 0) {
            return res.status(404).json({
                error: "Paciente não encontrado"
            });
        }

        return res.status(200).json(pacientes[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao buscar paciente"
        });
    }
}

async function createPacientes(req, res) {
    const { nome, email, senha, cpf, telefone, dataNascimento } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO pacientes (nome, email, senha, cpf, telefone, dataNascimento) VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, email, senha, cpf, telefone, dataNascimento]
        );

        return res.status(201).json({
            message: "Paciente criado com sucesso!",
            id: result.insertId
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao criar paciente"
        });
    }
}

async function updatePacientes(req, res) {
    const { id } = req.params;
    const { nome, email, senha, cpf, telefone, dataNascimento } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE pacientes SET nome = ?, email = ?, senha = ?, cpf = ?, telefone = ?, dataNascimento = ? WHERE idpacientes = ?`,
            [nome, email, senha, cpf, telefone, dataNascimento, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Paciente não encontrado"
            });
        }

        return res.status(200).json({
            message: "Paciente atualizado com sucesso!"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao atualizar paciente"
        });
    }
}

async function deletePacientes(req, res) {
    const { id } = req.params;

    if (!id || id <= 0) {
        return res.status(400).json({
            error: "Id inválido"
        });
    }

    try {
        const [result] = await pool.query(`DELETE FROM pacientes WHERE idpacientes = ?;`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Paciente não encontrado"
            });
        }

        return res.status(200).json({
            message: "Paciente deletado com sucesso!"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao deletar paciente"
        });
    }
}

module.exports = {
    getPacientes,
    getPacientesById,
    createPacientes,
    updatePacientes,
    deletePacientes
};