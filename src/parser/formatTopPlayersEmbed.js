function formatTopPlayersEmbed(playersList) {
  if (!Array.isArray(playersList) || playersList.length === 0) {
    return {
      embeds: [
        {
          color: 0xf8c004,
          title: "🏆 TOP 10 JOGADORES",
          description: "Nenhum dado encontrado.",
        },
      ],
    };
  }

  const medals = ["🥇", "🥈", "🥉"];

  const leaderboard = playersList
    .slice(0, 10)
    .map((player, index) => {
      const kd = (player.kills / Math.max(player.deaths, 1)).toFixed(2);

      const position =
        medals[index] || `\`${String(index + 1).padStart(2, "0")}º\``;

      return `${position} **${player.player_name}**
> 🎯 **Kills:** \`${player.kills.toLocaleString()}\`
> 💀 **Deaths:** \`${player.deaths.toLocaleString()}\`
> 🔥 **Headshots:** \`${player.headshots.toLocaleString()}\`
> ⚔️ **K/D:** \`${kd}\``;
    })
    .join("\n\n");

  return {
    embeds: [
      {
        color: 0xf8c004,
        title: "🏆 TOP 10 JOGADORES",
        description: leaderboard,
        thumbnail: {
          url: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
        },
      },
    ],
  };
}

module.exports = { formatTopPlayersEmbed };
