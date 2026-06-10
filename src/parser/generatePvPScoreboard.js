/**
 * Processa o histórico misto de Kills/Deaths de um jogador e gera o placar PvP consolidado.
 * @param {string} targetPlayer - O nome do jogador central (ex: '$ TXEIRArsrs')
 * @param {Array} killHistory - O array contendo os dados de abates e mortes
 * @returns {Array<string>} Lista de strings formatadas em "Player A X x Y Player B"
 */
function generatePvPScoreboard(targetPlayer, killHistory) {
    if (!Array.isArray(killHistory) || killHistory.length === 0) {
        return [];
    }

    // Objeto para armazenar os scores contra cada oponente separado
    const pvpMatches = {};

    killHistory.forEach(event => {
        let opponent = '';
        
        // Determina quem é o oponente no evento atual
        if (event.killer === targetPlayer) {
            opponent = event.victim;
        } else if (event.victim === targetPlayer) {
            opponent = event.killer;
        } else {
            return; // Se o player alvo não estiver envolvido, ignora
        }

        // Inicializa o oponente no mapa caso seja o primeiro confronto registrado com ele
        if (!pvpMatches[opponent]) {
            pvpMatches[opponent] = { kills: 0, deaths: 0 };
        }

        // Computa o ponto no placar
        if (event.killer === targetPlayer) {
            pvpMatches[opponent].kills += 1;   // Vitória do player alvo
        } else {
            pvpMatches[opponent].deaths += 1;  // Derrota do player alvo
        }
    });

    // Transforma o mapa de confrontos no formato de texto solicitado
    const formattedScoreboard = Object.entries(pvpMatches).map(([opponentName, score]) => {
        // Formato exato: Player A X x Y Player B
        return `${targetPlayer} **${score.kills} x ${score.deaths}** ${opponentName}`;
    });

    // Ordena o placar por quem o jogador teve mais confrontos totais (mais movimentado no topo)
    return formattedScoreboard.sort((a, b) => {
        const totalA = parseInt(a.split(' x ')[0].split(' ').pop()) + parseInt(a.split(' x ')[1].split(' ')[0]);
        const totalB = parseInt(b.split(' x ')[0].split(' ').pop()) + parseInt(b.split(' x ')[1].split(' ')[0]);
        return totalB - totalA;
    });
}

module.exports = { generatePvPScoreboard };