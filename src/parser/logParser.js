function parseKillEvent(message) {
  try {
    if (
      !message.embeds ||
      message.embeds.length === 0 ||
      !message.embeds[0].description
    ) {
      return null;
    }

    const description = message.embeds[0].description;
    const killRegex = /^(.*?)\s+apagou\s+(.*?)\s+-\s+(.*?)\s+-\s+(\d+)m\.$/;
    const match = description.match(killRegex);

    if (!match) {
      return null;
    }

    const killerName = match[1].trim();
    const victimName = match[2].trim();
    const weapon = match[3].trim();
    const distance = parseInt(match[4], 10);
    const isHeadshot = message.embeds[0]?.color == 16763904;

    return {
      id: message.id,
      timestamp: message.timestamp,
      description,
      killer: killerName,
      victim: victimName,
      weapon: weapon,
      distance: distance,
      isHeadshot: isHeadshot,
    };
  } catch (error) {
    console.error("Erro ao processar linha de log:", error);
    return null;
  }
}

module.exports = {
  parseKillEvent,
};
