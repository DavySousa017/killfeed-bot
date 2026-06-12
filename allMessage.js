const { updateKillFeed } = require("./src/api/updateKillFeed");
const { updatePlayerData } = require("./src/api/updatePlayerData");
require("dotenv").config();
const token = process.env.BOT_TOKEN

(async () => {
  let before = "";

  while (true) {
    let url = `https://discord.com/api/v9/channels/1411432013067714662/messages?${before ? "before=" + before + "&" : ""}limit=100`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    let res = await response.json();
    let saveds = await updateKillFeed(res);
    
    console.log(saveds);

    if (saveds && saveds.length > 0) {
      for (const msg of saveds) {
        try {
          await updatePlayerData(msg);
          console.log(`Dados da mensagem ${msg.id} atualizados com sucesso!`);
        } catch (err) {
          console.error(
            `Erro ao atualizar dados da mensagem ${msg.id}:`,
            err.message,
          );
        }
      }
    }

    if (!res || !Array.isArray(res) || res.length === 0) {
      console.log("Acabaram as mensagens ou ocorreu um erro.");
      break;
    }

    before = res[res.length - 1].id;

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("Loop finalizado com sucesso!");
})();
