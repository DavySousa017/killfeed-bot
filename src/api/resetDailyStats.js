const cron = require("node-cron");
const pool = require("../config/database");
require("dotenv").config();

async function resetDailyStats() {
  console.log(
    `[CRON] Iniciando o reset da tabela player_daily_stats... 🕒 ${new Date().toISOString()}`,
  );

  // Opção A: TRUNCATE TABLE player_daily_stats; (Apaga todas as linhas, limpa a tabela do zero)
  // Opção B: UPDATE player_daily_stats SET kills = 0, deaths = 0, headshots = 0; (Mantém os IDs dos players mas zera os números)

  const queryText =
    "UPDATE player_daily_stats SET kills = 0, deaths = 0, headshots = 0, total_kill_distance = 0, avg_kill_distance = 0, kdr = 0, longest_kill_distance = 0;";

  try {
    await pool.query(queryText);
    console.log("[CRON] Tabela player_daily_stats resetada com sucesso! 🔄");
  } catch (error) {
    console.error("[CRON] Erro ao resetar a tabela player_daily_stats:", error);
  }
}

function initCronJobs() {
  cron.schedule(
    "0 0 * * *",
    () => {
      resetDailyStats();
    },
    {
      scheduled: true,
      timezone: "America/Sao_Paulo", // Garante que vai rodar na meia-noite do horário de Brasília
    },
  );

  console.log("[CRON] Agendamento de reset diário ativado (00:00).");
}

module.exports = { initCronJobs };
