require("dotenv").config();
const pool = require("../config/database");

async function updateKillFeed(messages) {
  const client = await pool.connect();
  try {
    const results = [];

    for (const message of messages) {
      const isHs = message.embeds[0]?.color == 16763904;
      const query = `
          INSERT INTO messages_today (
            message_id, 
            channel_id, 
            author_id, 
            author_username, 
            content, 
            timestamp,
            message_type,
            hs
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (message_id) DO NOTHING
          RETURNING *
        `;

      const values = [
        message.id,
        message.channel_id,
        message.author.id,
        message.author.username,
        message.embeds[0].description,
        message.timestamp,
        message.type,
        isHs,
      ];
      const result = await client.query(query, values);
      if (result.rows.length > 0) {
        results.push(message);
      }
    }
    return results;
  } catch (error) {
    console.error("Erro ao salvar mensagem:", error);
  } finally {
    client.release();
  }
}

module.exports = { updateKillFeed };
