require("dotenv").config();

function formatPlayerInfo(data, playerName, scoreboard = []) {
  const {
    kills,
    deaths,
    avg_kill_distance,
    longest_kill_distance,
    headshots,
    updated_at,
    player_name,
  } = data;

  const kd = (kills / (deaths || 1)).toFixed(2);

  const pvpScoreboardText =
    scoreboard.length > 0
      ? scoreboard.join("\n")
      : "Nenhum confronto direto registrado hoje.";

  return {
    embeds: [
      {
        color: 0xf8c004,
        title: `Estatísticas: ${playerName || player_name}`,
        description: [
          `**📈 K/D:** \`${kd}\``,
          `**🗡️ Kills:** \`${kills}\``,
          `**💀 Deaths:** \`${deaths}\``,
          `**🎯 Headshots:** \`${headshots}\``,
          `**📏 Dist. Média:** \`${avg_kill_distance}m\``,
          `**🔭 Maior Dist.:** \`${longest_kill_distance}m\``,
          "\u200b", // 💡 Adiciona uma linha com caractere invisível para forçar o espaçamento antes do bloco PvP
        ].join("\n"),
        ...(scoreboard.length > 0 && {
          fields: [
            {
              name: "⚔️ Confrontos de Hoje",
              value: pvpScoreboardText,
              inline: false,
            },
          ],
        }),
      },
    ],
  };
}

module.exports = { formatPlayerInfo };
