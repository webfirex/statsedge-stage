import { z } from "zod";

export class SportApiLOLStatsZod {
  public static Damage = z.object({
    dealt: z.number().nullable(),
    dealt_percentage: z.number().nullable(),
    dealt_to_champions: z.number().nullable(),
    dealt_to_champions_percentage: z.number().nullable(),
    taken: z.number().nullable(),
  });

  public static LOLChampion = z.object({
    armor: z.number(),
    armorperlevel: z.number(),
    attackdamage: z.number(),
    attackdamageperlevel: z.number(),
    attackrange: z.number(),
    attackspeedoffset: z.number().nullable(),
    attackspeedperlevel: z.number(),
    big_image_url: z.string(),
    crit: z.number(),
    critperlevel: z.number(),
    hp: z.number(),
    hpperlevel: z.number(),
    hpregen: z.number(),
    hpregenperlevel: z.number(),
    id: z.number(),
    image_url: z.string(),
    movespeed: z.number(),
    mp: z.number(),
    mpperlevel: z.number(),
    mpregen: z.number(),
    mpregenperlevel: z.number(),
    name: z.string(),
    spellblock: z.number(),
    spellblockperlevel: z.number(),
    videogame_versions: z.array(z.string()),
  });

  public static LOLBaseChampion = z.object({
    id: z.number(),
    image_url: z.string(),
    name: z.string(),
  });

  public static LOLKillSeries = z.object({
    double_kills: z.number().nullable(),
    penta_kills: z.number().nullable(),
    quadra_kills: z.number().nullable(),
    triple_kills: z.number().nullable(),
  });

  public static LOLKillCounters = z.object({
    inhibitors: z.number().nullable(),
    neutral_minions: z.number().nullable(),
    neutral_minions_enemy_jungle: z.number().nullable(),
    neutral_minions_team_jungle: z.number().nullable(),
    players: z.number().nullable(),
    turrets: z.number().nullable(),
    wards: z.number().nullable(),
  });

  public static LOLGamePlayerDamageForStats = z.object({
    dealt: z.number().nullable(),
    dealt_to_champions: z.number().nullable(),
    taken: z.number().nullable(),
  });

  public static LOLBaseTeamObject = z.object({
    acronym: z.string().nullable(),
    id: z.number(),
    image_url: z.string().nullable(),
    location: z.string().nullable(),
    modified_at: z.string().nullable(),
    name: z.string(),
    slug: z.string().nullable(),
  });

  public static LOLPlayerAveragesObject = z.object({
    assists: z.number().nullable(),
    cs_at_14: z.number().nullable(),
    cs_diff_at_14: z.number().nullable(),
    deaths: z.number().nullable(),
    gold_earned: z.number().nullable(),
    gold_percentage: z.number().nullable(),
    gold_spent: z.number().nullable(),
    kill_counters: z.object({
      inhibitors: z.number().nullable(),
      neutral_minions: z.number().nullable(),
      neutral_minions_enemy_jungle: z.number().nullable(),
      neutral_minions_team_jungle: z.number().nullable(),
      players: z.number().nullable(),
      turrets: z.number().nullable(),
      wards: z.number().nullable(),
    }),
    kills: z.number().nullable(),
    magic_damage: this.Damage,
    minions_killed: z.number().nullable(),
    physical_damage: this.Damage,
    total_damage: this.Damage,
    total_heal: z.number().nullable(),
    total_time_crowd_control_dealt: z.number().nullable(),
    total_units_healed: z.number().nullable(),
    true_damage: this.Damage,
    vision_wards_bought_in_game: z.number().nullable(),
    wards_placed: z.number().nullable(),
  });

  public static LOLPlayerStatsTotals = z.object({
    assists: z.number().nullable(),
    deaths: z.number().nullable(),
    games_lost: z.number().nullable(),
    games_played: z.number().nullable(),
    games_won: z.number().nullable(),
    kill_counters: z.object({
      inhibitors: z.number().nullable(),
      turrets: z.number().nullable().nullable(),
      wards: z.number().nullable(),
    }),
    kills: z.number().nullable(),
    kills_series: z.object({
      double_kills: z.number().nullable(),
      penta_kills: z.number().nullable(),
      quadra_kills: z.number().nullable(),
      triple_kills: z.number().nullable(),
    }),
    matches_lost: z.number().nullable(),
    matches_played: z.number().nullable(),
    matches_won: z.number().nullable(),
    wards_placed: z.number().nullable(),
  });

  public static LOLRunereForged = z.object({
    id: z.number(),
    image_url: z.string(),
    name: z.string(),
    type: z.string(),
  });

  public static LOLPlayerSecondaryRunePath = z.object({
    id: z.number(),
    image_url: z.string(),
    lesser_runes: z.array(this.LOLRunereForged),
    name: z.string(),
    type: z.string(),
  });

  public static LOLPlayerPrimaryRunePath = z.object({
    id: z.number(),
    image_url: z.string(),
    keystone: this.LOLRunereForged,
    lesser_runes: z.array(this.LOLRunereForged),
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

  public static LOLWards = z.object({
    placed: z.number().nullable(),
    sight_wards_bought_in_game: z.number().nullable(),
    vision_wards_bought_in_game: z.number().nullable(),
  });

  public static Videogame = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
  });

  public static VideogameTitle = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    videogame_id: z.number(),
  });

  public static Serie = z.object({
    begin_at: z.string().nullable(),
    end_at: z.string().nullable(),
    full_name: z.string(),
    id: z.number(),
    league: z.object({
      id: z.number(),
      image_url: z.string().nullable(),
      modified_at: z.string(),
      name: z.string(),
      slug: z.string(),
      url: z.string().nullable(),
    }),
    league_id: z.number(),
    modified_at: z.string(),
    name: z.string().nullable(),
    season: z.string().nullable(),
    slug: z.string().nullable(),
    tournaments: z.array(
      z.object({
        begin_at: z.string().nullable(),
        detailed_stats: z.boolean().nullable(),
        end_at: z.string().nullable(),
        has_bracket: z.boolean().nullable(),
        id: z.number(),
        league_id: z.number(),
        live_supported: z.boolean().nullable(),
        modified_at: z.string(),
        name: z.string(),
        prizepool: z.string().nullable(),
        serie_id: z.number(),
        slug: z.string(),
        tier: z.string().nullable(),
        winner_id: z.number().nullable(),
        winner_type: z.string().nullable(),
      })
    ),
    videogame: this.Videogame,
    videogame_title: this.VideogameTitle.nullable(),
    winner_id: z.number().nullable(),
    winner_type: z.enum(["Team", "Player"]).nullable(),
    year: z.number().nullable(),
  });

  public static BasePlayer = z.object({
    active: z.boolean(),
    age: z.number().nullable(),
    birthday: z.string().nullable(),
    first_name: z.string().nullable(),
    id: z.number(),
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
    id: z.number(),
    image_url: z.string().nullable(),
    location: z.string().nullable(),
    modified_at: z.string(),
    name: z.string(),
    slug: z.string().nullable(),
  });
}
