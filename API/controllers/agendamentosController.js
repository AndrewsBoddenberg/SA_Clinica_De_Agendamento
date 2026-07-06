const { pool } = require("../database/connection");

async function getAgendamentos(req, res) {
    try {
        const querySQL = `SELECT a.idagendamentos, a.status_consulta, p.nome AS nome_paciente, m.nome_medico, m.especialidade, m.dia_disponivel, m.hora_disponivel
            FROM agendamentos a INNER JOIN pacientes p ON a.pacientes_idpacientes = p.idpacientes INNER JOIN medicos m ON a.medicos_idmedicos = m.idmedicos;`;
        const [agendamentos] = await pool.query(querySQL);
        return res.status(200).json(agendamentos);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao buscar agendamentos"
        });
    }
}

async function getAgendamentosById(req, res) {
    const { id } = req.params;

    if (!id || id <= 0) {
        return res.status(400).json({
            error: "Id inválido"
        });
    }

    try {
        const querySQL = `SELECT a.idagendamentos, a.status_consulta, p.nome AS nome_paciente, m.nome_medico, m.especialidade, m.dia_disponivel, m.hora_disponivel FROM agendamentos a INNER JOIN pacientes p ON a.pacientes_idpacientes = p.idpacientes NNER JOIN medicos m ON a.medicos_idmedicos = m.idmedicos WHERE a.idagendamentos = ?;`;
        const [agendamentos] = await pool.query(querySQL, [id]);

        if (agendamentos.length === 0) {
            return res.status(404).json({
                error: "Agendamento não encontrado"
            });
        }

        return res.status(200).json(agendamentos[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao buscar agendamento"
        });
    }
}

async function createAgendamentos(req, res) {
    const { status_consulta, pacientes_idpacientes, medicos_idmedicos } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO agendamentos (status_consulta, pacientes_idpacientes, medicos_idmedicos) VALUES (?, ?, ?)`,
            [status_consulta, pacientes_idpacientes, medicos_idmedicos]
        );

        return res.status(201).json({
            message: "Agendamento realizado com sucesso!",
            id: result.insertId
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao criar agendamento"
        });
    }
}

async function updateAgendamentos(req, res) {
    const { id } = req.params;
    const { status_consulta, pacientes_idpacientes, medicos_idmedicos } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE agendamentos SET status_consulta = ?, pacientes_idpacientes = ?, medicos_idmedicos = ? WHERE idagendamentos = ?`,
            [status_consulta, pacientes_idpacientes, medicos_idmedicos, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Agendamento não encontrado"
            });
        }

        return res.status(200).json({
            message: "Agendamento atualizado com sucesso!"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao atualizar agendamento"
        });
    }
}

async function deleteAgendamentos(req, res) {
    const { id } = req.params;

    if (!id || id <= 0) {
        return res.status(400).json({
            error: "Id inválido"
        });
    }

    try {
        const [result] = await pool.query(`DELETE FROM agendamentos WHERE idagendamentos = ?;`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Agendamento não encontrado"
            });
        }

        return res.status(200).json({
            message: "Agendamento deletado com sucesso!"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Erro ao deletar agendamento"
        });
    }
}

module.exports = {
    getAgendamentos,
    getAgendamentosById,
    createAgendamentos,
    updateAgendamentos,
    deleteAgendamentos
};