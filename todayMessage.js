const { updatePlayerDataToday } = require("./src/api/updatePlayerDataToday");
const { parseKillEvent } = require("./src/parser/logParser");
require("dotenv").config();
const token = process.env.BOT_TOKEN

(async () => {
  let before = "";

  const todayBrString = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });

  const startOfToday = new Date(`${todayBrString}T00:00:00-03:00`);

  console.log("Meia-noite no fuso do Brasil:", startOfToday.toISOString());

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

    if (!res || !Array.isArray(res) || res.length === 0) {
      console.log("Acabaram as mensagens ou ocorreu um erro.");
      break;
    }

    let todaysMessages = res.filter(
      (msg) => new Date(msg.timestamp) >= startOfToday,
    );

    if (todaysMessages.length > 0) {
      for (const msg of todaysMessages) {
        try {
          await updatePlayerDataToday(msg);

          console.log(parseKillEvent(msg));
          console.log(`Dados da mensagem ${msg.id} atualizados com sucesso!`);
        } catch (err) {
          console.error(
            `Erro ao atualizar dados da mensagem ${msg.id}:`,
            err.message,
          );
        }
      }
    }
    if (todaysMessages.length < res.length) {
      console.log(
        "Chegamos nas mensagens anteriores a hoje. Finalizando a busca...",
      );
      break;
    }

    before = res[res.length - 1].id;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("Loop finalizado com sucesso!");
})();
