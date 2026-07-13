const { pool } = require("../database/connection");

async function getHorarios(req, res) {
  try {
    const querySQL = `
            SELECT h.idhorario, h.dia, h.hora, h.status, m.nome_medico, m.especialidade
            FROM horarios_medicos h
            INNER JOIN medicos m ON h.medicos_idmedicos = m.idmedicos;
        `;
    const [horarios] = await pool.query(querySQL);
    return res.status(200).json(horarios);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro ao buscar horários",
    });
  }
}

async function getHorariosByMedico(req, res) {
  const { medicoId } = req.params;

  if (!medicoId || medicoId <= 0 || isNaN(medicoId)) {
    return res.status(400).json({
      error: "Id do médico inválido",
    });
  }

  try {
    const querySQL = `
            SELECT idhorario, dia, hora, status 
            FROM horarios_medicos 
            WHERE medicos_idmedicos = ?;
        `;
    const [horarios] = await pool.query(querySQL, [medicoId]);
    return res.status(200).json(horarios);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro ao buscar horários do médico",
    });
  }
}

async function createHorarios(req, res) {
  const { medicos_idmedicos, dia, hora, status } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO horarios_medicos (medicos_idmedicos, dia, hora, status) VALUES (?, ?, ?, ?)`,
      [medicos_idmedicos, dia, hora, status || "Disponivel"],
    );

    return res.status(201).json({
      message: "Horário cadastrado com sucesso!",
      id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro ao cadastrar horário",
    });
  }
}

async function updateHorarios(req, res) {
  const { id } = req.params;
  const { medicos_idmedicos, dia, hora, status } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE horarios_medicos SET medicos_idmedicos = ?, dia = ?, hora = ?, status = ? WHERE idhorario = ?`,
      [medicos_idmedicos, dia, hora, status, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Horário não encontrado",
      });
    }

    return res.status(200).json({
      message: "Horário atualizado com sucesso!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro ao atualizar horário",
    });
  }
}

async function deleteHorarios(req, res) {
  const { id } = req.params;

  if (!id || id <= 0) {
    return res.status(400).json({
      error: "Id inválido",
    });
  }

  try {
    const [result] = await pool.query(
      `DELETE FROM horarios_medicos WHERE idhorario = ?;`,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Horário não encontrado",
      });
    }

    return res.status(200).json({
      message: "Horário deletado com sucesso!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Erro ao deletar horário",
    });
  }
}

module.exports = {
  getHorarios,
  getHorariosByMedico,
  createHorarios,
  updateHorarios,
  deleteHorarios,
};
