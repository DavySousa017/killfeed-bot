require("dotenv").config();
const pool = require("../config/database");

async function getPlayerDataToday(playerName) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT * FROM player_daily_stats WHERE player_name = $1 AND stats_date = CURRENT_DATE",
      [playerName],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Erro ao buscar informações diárias do jogador:", error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { getPlayerDataToday };
