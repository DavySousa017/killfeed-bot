require("dotenv").config();
const pool = require("../config/database");

async function getPlayerData(playerName) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT * FROM player_stats WHERE player_name = $1",
      [playerName],
    );

    return result.rows[0];
  } catch (error) {
    console.error("Erro no processo completo:", error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { getPlayerData };
