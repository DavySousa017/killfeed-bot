class sqlQueries {
  updateKillerDailyStats = async (client, killerName, distance, hs) => {
    await client.query(
      `
    INSERT INTO player_daily_stats (
      player_name, stats_date, kills, deaths, total_kill_distance, 
      avg_kill_distance, longest_kill_distance, headshots, updated_at
    ) VALUES ($1, CURRENT_DATE, 1, 0, $2, $2, $2, $3, CURRENT_TIMESTAMP)
    ON CONFLICT (player_name, stats_date) 
    DO UPDATE SET 
      kills = player_daily_stats.kills + 1,
      total_kill_distance = player_daily_stats.total_kill_distance + $2,
      avg_kill_distance = (player_daily_stats.total_kill_distance + $2) / (player_daily_stats.kills + 1),
      longest_kill_distance = GREATEST(player_daily_stats.longest_kill_distance, $2),
      headshots = player_daily_stats.headshots + $3,
      updated_at = CURRENT_TIMESTAMP`,
      [killerName, distance, hs ? 1 : 0],
    );
  };

  updateVictimDailyStats = async (client, victimName) => {
    await client.query(
      `
    INSERT INTO player_daily_stats (
      player_name, stats_date, kills, deaths, total_kill_distance, 
      avg_kill_distance, longest_kill_distance, headshots, updated_at
    ) VALUES ($1, CURRENT_DATE, 0, 1, 0.00, 0.00, 0.00, 0, CURRENT_TIMESTAMP) 
    ON CONFLICT (player_name, stats_date) 
    DO UPDATE SET 
      deaths = player_daily_stats.deaths + 1,
      updated_at = CURRENT_TIMESTAMP`,
      [victimName],
    );
  };

  updateKillerStats = async (client, killerName, distance, hs) => {
    await client.query(
      `
    INSERT INTO player_stats (
      player_name, kills, deaths, total_kill_distance, 
      avg_kill_distance, longest_kill_distance, headshots, updated_at
    ) VALUES ($1, 1, 0, $2, $2, $2, $3, CURRENT_TIMESTAMP)
    ON CONFLICT (player_name) 
    DO UPDATE SET 
      kills = player_stats.kills + 1,
      total_kill_distance = player_stats.total_kill_distance + $2,
      avg_kill_distance = (player_stats.total_kill_distance + $2) / (player_stats.kills + 1),
      longest_kill_distance = GREATEST(player_stats.longest_kill_distance, $2),
      headshots = player_stats.headshots + $3,
      updated_at = CURRENT_TIMESTAMP`,
      [killerName, distance, hs ? 1 : 0],
    );
  };

  updateVictimStats = async (client, victimName) => {
    await client.query(
      `
    INSERT INTO player_stats (
      player_name, kills, deaths, total_kill_distance, 
      avg_kill_distance, longest_kill_distance, headshots, updated_at
    ) VALUES ($1, 0, 1, 0.00, 0.00, 0.00, 0, CURRENT_TIMESTAMP) 
    ON CONFLICT (player_name) 
    DO UPDATE SET 
      deaths = player_stats.deaths + 1,
      updated_at = CURRENT_TIMESTAMP`,
      [victimName],
    );
  };
}

module.exports = new sqlQueries();
