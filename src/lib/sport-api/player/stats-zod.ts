import { z } from "zod";

export class SportApiLOLStatsZod {
  public static Damage = z.object({
    dealt: z.number().int().nullable(),
    dealt_percentage: z.number().int().nullable(),
    dealt_to_champions: z.number().int().nullable(),
    dealt_to_champions_percentage: z.number().int().nullable(),
    taken: z.number().int().nullable(),
  });

  public static LOLChampion = z.object({
    armor: z.number().int(),
    armorperlevel: z.number().int(),
    attackdamage: z.number().int(),
    attackdamageperlevel: z.number().int(),
    attackrange: z.number().int(),
    attackspeedoffset: z.number().int().nullable(),
    attackspeedperlevel: z.number().int(),
    big_image_url: z.string(),
    crit: z.number().int(),
    critperlevel: z.number().int(),
    hp: z.number().int(),
    hpperlevel: z.number().int(),
    hpregen: z.number().int(),
    hpregenperlevel: z.number().int(),
    id: z.number().int(),
    image_url: z.string(),
    movespeed: z.number().int(),
    mp: z.number().int(),
    mpperlevel: z.number().int(),
    mpregen: z.number().int(),
    mpregenperlevel: z.number().int(),
    name: z.string(),
    spellblock: z.number().int(),
    spellblockperlevel: z.number().int(),
    videogame_versions: z.array(z.string()),
  });

  public static LOLBaseChampion = z.object({
    id: z.number().int(),
    image_url: z.string(),
    name: z.string(),
  });

  public static LOLKillSeries = z.object({
    double_kills: z.number().int().nullable(),
    penta_kills: z.number().int().nullable(),
    quadra_kills: z.number().int().nullable(),
    triple_kills: z.number().int().nullable(),
  });

  public static LOLKillCounters = z.object({
    inhibitors: z.number().int().nullable(),
    neutral_minions: z.number().int().nullable(),
    neutral_minions_enemy_jungle: z.number().int().nullable(),
    neutral_minions_team_jungle: z.number().int().nullable(),
    players: z.number().int().nullable(),
    turrets: z.number().int().nullable(),
    wards: z.number().int().nullable(),
  });

  public static LOLGamePlayerDamageForStats = z.object({
    dealt: z.number().int().nullable(),
    dealt_to_champions: z.number().int().nullable(),
    taken: z.number().int().nullable(),
  });

  public static LOLBaseTeamObject = z.object({
    acronym: z.string().nullable(),
    id: z.number().int(),
    image_url: z.string().nullable(),
    location: z.string().nullable(),
    modified_at: z.string().nullable(),
    name: z.string(),
    slug: z.string().nullable(),
  });

  public static LOLPlayerAveragesObject = z.object({
    assists: z.number().int().nullable(),
    cs_at_14: z.number().int().nullable(),
    cs_diff_at_14: z.number().int().nullable(),
    deaths: z.number().int().nullable(),
    gold_earned: z.number().int().nullable(),
    gold_pecentage: z.number().int().nullable(),
    gold_spent: z.number().int().nullable(),
    kill_counters: z.object({
      inhibitors: z.number().int().nullable(),
      neutral_minions: z.number().int().nullable(),
      neutral_minions_enemy_jungle: z.number().int().nullable(),
      neutral_minions_team_jungle: z.number().int().nullable(),
      players: z.number().int().nullable(),
      turrets: z.number().int().nullable(),
      wards: z.number().int().nullable(),
    }),
    kills: z.number().int().nullable(),
    magic_damage: this.Damage,
    minions_killed: z.number().int().nullable(),
    physical_damage: this.Damage,
    total_damage: this.Damage,
    total_heal: z.number().int().nullable(),
    total_time_crowd_control_dealt: z.number().int().nullable(),
    total_units_healed: z.number().int().nullable(),
    true_damage: this.Damage,
    vision_wards_bought_in_game: z.number().int().nullable(),
    wards_placed: z.number().int().nullable(),
  });

  public static LOLPlayerStatsTotals = z.object({
    assists: z.number().int().nullable(),
    deaths: z.number().int().nullable(),
    games_lost: z.number().int().nullable(),
    games_played: z.number().int().nullable(),
    games_won: z.number().int().nullable(),
    kill_counters: z.object({
      inhibitors: z.number().int().nullable(),
      turrents: z.number().int().nullable(),
      wards: z.number().int().nullable(),
    }),
    kills: z.number().int().nullable(),
    kills_series: z.object({
      double_kills: z.number().int().nullable(),
      penta_kills: z.number().int().nullable(),
      quadra_kills: z.number().int().nullable(),
      triple_kills: z.number().int().nullable(),
    }),
    matches_lost: z.number().int().nullable(),
    matches_played: z.number().int().nullable(),
    matches_won: z.number().int().nullable(),
    wards_placed: z.number().int().nullable(),
  });

  public static LOLRunereForged = z.object({
    id: z.number().int(),
    image_url: z.string(),
    name: z.string(),
    type: z.string(),
  });

  public static LOLPlayerSecondaryRunePath = z.object({
    id: z.number().int(),
    image_url: z.string(),
    lesser_runes: z.array(this.LOLRunereForged),
    name: z.string(),
    type: z.string(),
  });

  public static LOLPlayerPrimaryRunePath = z.object({
    id: z.number().int(),
    image_url: z.string(),
    keystone: this.LOLRunereForged,
    lesser_runes: this.LOLRunereForged,
    name: z.string(),
    type: z.string(),
  });

  public static LOLFlags = z.object({
    first_blood_assist: z.boolean().nullable(),
    first_blood_kill: z.boolean().nullable(),
    first_inhibitor_assist: z.boolean().nullable(),
    first_inhibitor_kill: z.boolean().nullable(),
    first_tower_assist: z.boolean().nullable(),
    first_tower_kill: z.boolean().nullable(),
  });

  public static Videogame = z.object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
  });

  public static VideogameTitle = z.object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
    videogame_id: z.number().int(),
  });

  public static Serie = z.object({
    begin_at: z.string().nullable(),
    end_at: z.string().nullable(),
    full_name: z.string(),
    id: z.number().int(),
    league: z.object({
      id: z.number().int(),
      image_url: z.string().nullable(),
      modified_at: z.string(),
      name: z.string(),
      slug: z.string(),
      url: z.string().nullable(),
    }),
    league_id: z.number().int(),
    modified_at: z.string(),
    name: z.string().nullable(),
    season: z.string().nullable(),
    slug: z.string().nullable(),
    tournaments: z.object({
      begin_at: z.string().nullable(),
      detailed_stats: z.boolean().nullable(),
      end_at: z.string().nullable(),
      has_bracket: z.boolean().nullable(),
      id: z.number().int(),
      league_id: z.number().int(),
      live_supported: z.boolean().nullable(),
      modified_at: z.string(),
      name: z.string(),
      prizepool: z.string().nullable(),
      serie_id: z.number().int(),
      slug: z.string(),
      tier: z.string().nullable(),
      winner_id: z.number().int().nullable(),
      winner_type: z.string().nullable(),
    }),
    videogame: this.Videogame,
    videogame_title: this.VideogameTitle.nullable(),
    winner_id: z.number().int().nullable(),
    winner_type: z.enum(["Team", "Player"]).nullable(),
    year: z.number().int().nullable(),
  });

  public static BasePlayer = z.object({
    active: z.boolean(),
    age: z.number().int().nullable(),
    birthday: z.string().nullable(),
    first_name: z.string().nullable(),
    id: z.number().int(),
    image_url: z.string().nullable(),
    last_name: z.string().nullable(),
    modified_at: z.string(),
    name: z.string(),
    nationality: z.string().nullable(),
    role: z.string().nullable(),
    slug: z.string().nullable(),
  });

  public static BaseTeam = z.object({
    acronym: z.string().nullable(),
    id: z.number().int(),
    image_url: z.string().nullable(),
    location: z.string().nullable(),
    modified_at: z.string(),
    name: z.string(),
    slug: z.string().nullable(),
  });
}
