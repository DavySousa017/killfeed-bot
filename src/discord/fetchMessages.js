async function fetchMessages(channelId, limit = 10) {
  const url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=${limit}`;
  const token =
    "MTUwMDMxNDM3NDUxNzI5MzE4Nw.GVz5AM.YMYxfVszB0YOKiIY3q7e9dGoUsGNha7XHSmjCY"; // Substitua pelo seu token de autenticação

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
