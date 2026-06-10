const pool = require("../config/database");

async function getTop10Players() {
  const queryText = `
    SELECT 
      player_name, 
      kills, 
      deaths, 
      headshots
    FROM player_stats
    ORDER BY kills DESC
    LIMIT 10;
  `;

  try {
    const res = await pool.query(queryText);
    return res.rows;
  } catch (err) {
    console.error("Erro ao buscar o Top 10 Kills:", err);
    throw err;
  }
}

module.exports = { getTop10Players };
