const { getPlayerData } = require("../../api/getPlayerData");
const { getPlayerLastKills } = require("../../api/getPlayerLastKills");
const { formatPlayerInfo } = require("../../parser/formatPlayerInfo");
const { generatePvPScoreboard } = require("../../parser/generatePvPScoreboard");

async function handlePlayerCommand(message, args) {
  const playerName = args.join(" ").trim();
  if (!playerName) {
    return message.reply({
      content: "❌ **Nome do jogador obrigatório!**\nUse: `!player EnzoRoblox`",
      allowedMentions: { repliedUser: false },
    });
  }

  try {
    const loadingMessage = await message.reply({
      content: "🔍 **Buscando informações do jogador...**",
      allowedMentions: { repliedUser: false },
    });

    const playerData = await getPlayerData(playerName);

    if (!playerData) {
      return loadingMessage.edit({
        content: `❌ **Jogador não encontrado!**\nNenhuma informação foi encontrada para: **${playerName}**`,
      });
    }

    // const history = await getPlayerLastKills(playerName) || [];
    // const formattedInfo = formatPlayerInfo(playerData, playerName, history);
    const formattedInfo = formatPlayerInfo(playerData, playerName);

    // console.log(history)

    // console.log(generatePvPScoreboard(playerName, history))
    await loadingMessage.edit(formattedInfo);
  } catch (error) {
    console.error("Erro ao buscar informações do jogador:", error);

    let errorMessage = `❌ **Erro ao buscar jogador "${playerName}"!**\n`;
    if (error.response?.status === 404) {
      errorMessage += "Jogador não encontrado.";
    } else if (error.response?.status === 429) {
      errorMessage +=
        "Muitas tentativas. Aguarde um momento e tente novamente.";
    } else {
      errorMessage += "Erro no servidor. Tente novamente mais tarde.";
    }

    message.reply({
      content: errorMessage,
      allowedMentions: { repliedUser: false },
    });
  }
}

module.exports = {
  handlePlayerCommand,
};
