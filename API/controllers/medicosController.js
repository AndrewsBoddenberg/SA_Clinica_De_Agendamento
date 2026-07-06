const { pool } = require("../database/connection");

async function getMedicos(req, res) {
    try {
        const [medicos] = await pool.query(`SELECT * FROM medicos;`);
        return res.status(200).json(medicos);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao buscar médicos"
        });
    }
}

async function getMedicosById(req, res) {
    const { id } = req.params;

    if (!id || id <= 0) {
        return res.status(400).json({
            error: "Id inválido"
        });
    }

    try {
        const [medicos] = await pool.query(`SELECT * FROM medicos WHERE idmedicos = ?;`, [id]);
        
        if (medicos.length === 0) {
            return res.status(404).json({
                error: "Médico não encontrado"
            });
        }

        return res.status(200).json(medicos[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao buscar médico"
        });
    }
}

async function createMedicos(req, res) {
    const { nome_medico, especialidade, dia_disponivel, hora_disponivel, status } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO medicos (nome_medico, especialidade, dia_disponivel, hora_disponivel, status) VALUES (?, ?, ?, ?, ?)`,
            [nome_medico, especialidade, dia_disponivel, hora_disponivel, status]
        );

        return res.status(201).json({
            message: "Médico criado com sucesso!",
            id: result.insertId
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao criar médico"
        });
    }
}

async function updateMedicos(req, res) {
    const { id } = req.params;
    const { nome_medico, especialidade, dia_disponivel, hora_disponivel, status } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE medicos SET nome_medico = ?, especialidade = ?, dia_disponivel = ?, hora_disponivel = ?, status = ? WHERE idmedicos = ?`,
            [nome_medico, especialidade, dia_disponivel, hora_disponivel, status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Médico não encontrado"
            });
        }

        return res.status(200).json({
            message: "Médico atualizado com sucesso!"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao atualizar médico"
        });
    }
}

async function deleteMedicos(req, res) {
    const { id } = req.params;

    if (!id || id <= 0) {
        return res.status(400).json({
            error: "Id inválido"
        });
    }

    try {
        const [result] = await pool.query(`DELETE FROM medicos WHERE idmedicos = ?;`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Médico não encontrado"
            });
        }

        return res.status(200).json({
            message: "Médico deletado com sucesso!"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao deletar médico"
        });
    }
}

module.exports = {
    getMedicos,
    getMedicosById,
    createMedicos,
    updateMedicos,
    deleteMedicos
};