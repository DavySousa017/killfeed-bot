require("dotenv").config();
const pool = require("../config/database");
const { updateVictimStats, updateKillerStats } = require("../config/sql");
const { parseKillEvent } = require("../parser/logParser");

async function updatePlayerData(message) {
  let killData = parseKillEvent(message);

  if (!killData) {
    return null;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { killer, victim, distance, isHeadshot } = killData;

    await updateKillerStats(client, killer, distance, isHeadshot);
    await updateVictimStats(client, victim);
    await client.query("COMMIT");

    return killData;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao atualizar estatísticas:", error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { updatePlayerData };
