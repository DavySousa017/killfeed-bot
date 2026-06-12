require("dotenv").config();

async function fetchMessages(channelId, limit = 10) {
  const url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=${limit}`;
  const token = process.env.DISCORD_SCRAPPER_TOKEN;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    let res = await response.json();

    return res;
  } catch (error) {
    console.error("(FetchMessages)Erro ao buscar mensagens:", error);
  }
}

module.exports = { fetchMessages };
