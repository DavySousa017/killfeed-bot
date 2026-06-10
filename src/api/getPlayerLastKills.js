require("dotenv").config();
const pool = require("../config/database");

async function getPlayerLastKills(playerName) {
  const queryText = `
    SELECT *
    FROM messages
    WHERE (content LIKE $1 OR content LIKE $2)
    AND DATE(timestamp AT TIME ZONE 'America/Sao_Paulo') = CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo'
    ORDER BY timestamp DESC`;

  try {
    // Padrão 1: O jogador matou alguém
    const killerPattern = `${playerName} apagou %`;
    // Padrão 2: Alguém matou o jogador
    const victimPattern = `% apagou ${playerName} - %`;

    const res = await pool.query(queryText, [killerPattern, victimPattern]);

    const formattedEvents = res.rows.map((row) => {
      const content = row.content;
      const killRegex = /^(.*?)\s+apagou\s+(.*?)\s+-\s+(.*?)\s+-\s+(\d+)m\.$/;
      const match = content.match(killRegex);

      if (match) {
        return {
          message_id: row.message_id,
          timestamp: row.timestamp,
          killer: match[1].trim(),  // Adicionado para saber quem matou
          victim: match[2].trim(),  // Adicionado para saber quem morreu
          weapon: match[3].trim(),
          distance: parseInt(match[4], 10),
        };
      }

      return {
        message_id: row.message_id,
        timestamp: row.timestamp,
        rawcontent: content,
      };
    });

    return formattedEvents;
  } catch (err) {
    console.error("Erro ao buscar as últimas ações do jogador:", err);
    throw err;
  }
}

module.exports = { getPlayerLastKills };