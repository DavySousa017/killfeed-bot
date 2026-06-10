async function help(message) {
  const helpText = `**📋 Comandos Disponíveis:**
- \`!help\`: Exibe ajuda sobre os comandos disponíveis.
- \`!player <nome>\`: Exibe informações do jogador.
- \`!today <nome>\`: Exibe estatísticas do jogador para o dia atual.
- \`!ranking\`: Exibe estatísticas dos melhores jogadores.`;
  message.reply(helpText);
}

module.exports = { help };
