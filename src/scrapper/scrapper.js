const { updateKillFeed } = require("../api/updateKillFeed");
const { updatePlayerData } = require("../api/updatePlayerData");
const { updatePlayerDataToday } = require("../api/updatePlayerDataToday");
const { fetchMessages } = require("../discord/fetchMessages");

async function scrapper() {
  try {
    let messages = await fetchMessages("1411432013067714662", 100);
    if (!messages) return;

    let saveds = await updateKillFeed(messages);

    if (saveds && saveds.length > 0) {
      for (const msg of saveds) {
        await updatePlayerData(msg);
        await updatePlayerDataToday(msg);
      }
    }

    return saveds;
  } catch (error) {
    console.error("Erro no loop de mensagens:", error);
  }
}

module.exports = {
  scrapper,
};
