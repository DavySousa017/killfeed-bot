const Discord = require("discord.js");
const { handlePlayerCommand } = require("./commands/player");
const { handlePlayerTodayCommand } = require("./commands/today");
const { help } = require("./commands/help");
const { getTop10Players } = require("../api/getTop10Players");
const { ranking } = require("./commands/ranking");

function startBot() {
  const client = new Discord.Client({
    intents: [
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.GuildMessages,
      Discord.GatewayIntentBits.MessageContent,
    ],
  });

  const prefix = "!";

  client.once("ready", () => {
    console.log("🤖 Bot do Discord está online!");
  });

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try {
      if (command === "player") {
        await handlePlayerCommand(message, args);
      } else if (command === "today") {
        await handlePlayerTodayCommand(message, args);
      } else if (command === "help") {
        await help(message);
      } else if (command === "ranking") {
        await ranking(message);
      }
    } catch (error) {
      console.error(`Erro no comando ${command}:`, error);
      // message.reply("❌ Ocorreu um erro interno. Tente novamente mais tarde.");
    }
  });

  // O login usa a variável de ambiente que será carregada no index.js
  client.login(process.env.BOT_TOKEN);
}

// Exportamos a função
module.exports = { startBot };
