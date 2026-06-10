require("dotenv").config();
const pool = require("../config/database");
const {
  updateKillerDailyStats,
  updateVictimDailyStats,
} = require("../config/sql");
const { parseKillEvent } = require("../parser/logParser");

async function updatePlayerDataToday(message) {
  const todayBrString = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });

  let killData = parseKillEvent(message);

  if (!killData) {
    return null;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { killer, victim, distance, isHeadshot } = killData;

    const startOfToday = new Date(`${todayBrString}T00:00:00-03:00`);
    if (new Date(message.timestamp) >= startOfToday) {
      await updateKillerDailyStats(client, killer, distance, isHeadshot);
      await updateVictimDailyStats(client, victim);
    }

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

module.exports = { updatePlayerDataToday };
