const { getTop10Players } = require("../../api/getTop10Players");
const { formatTopPlayersEmbed } = require("../../parser/formatTopPlayersEmbed");

async function ranking(message) {
  const res = await getTop10Players();
  const reply = formatTopPlayersEmbed(res);
  message.reply(reply);
}

module.exports = { ranking };
