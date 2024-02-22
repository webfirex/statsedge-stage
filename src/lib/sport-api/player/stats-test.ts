import { z } from "zod";
import { SportApiCore, SportApiLogger } from "../core";
import { SportApiLOLStatsZod } from "./stats-zod";

export class PlayerStatsTest {
  public static readonly Route = "PlayerStatsTest";
  public static readonly Path =
    "https://api.pandascore.co/lol/players/faker/stats";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),

    Response: z
      .object({
        id: z.number().int(),
        image_url: z.string().nullable(),
        first_name: z.string().nullable(),
        active: z.boolean(),
        age: z.number().int().nullable(),
        birthday: z.string().nullable(),
        current_team: z
          .object({
            acronym: z.string().nullable(),
            id: z.number().int(),
            image_url: z.string().nullable(),
            location: z.string().nullable(),
            modified_at: z.string(),
            name: z.string(),
            slug: z.string().nullable(),
          })
          .nullable(),

        current_videogame: z
          .object({
            id: z.number().int(),
            name: z.string(),
            slug: z.string(),
          })
          .nullable(),

        favorite_champions: z.array(
          z.object({
            champion: SportApiLOLStatsZod.LOLChampion,
            games_count: z.number().int(),
            games_lost: z.number().int(),
            games_won: z.number().int(),
            most_used_items: z.array(
              z.object({
                count: z.number().int(),
                id: z.number().int(),
                name: z.string(),
              })
            ),
          })
        ),

        last_games: z.array(
          z.object({
            assists: z.number().int(),
            champion: z
              .object({
                id: z.number().int(),
                name: z.string(),
                image_url: z.string(),
              })
              .nullable(),
            creep_score: z.number().int(),
            cs_at_14: z.number().int(),
            deaths: z.number().int(),
            flags: SportApiLOLStatsZod.LOLFlags,
            game_id: z.number().int(),
            gold_earned: z.number().int().nullable(),
            gold_spent: z.number().int().nullable(),
            items: z.array(
              z.object({
                id: z.number().int(),
                image_url: z.string().nullable(),
                is_trinket: z.boolean().nullable(),
                name: z.string(),
              })
            ),
            kills: z.number().int(),
            kills_counters: SportApiLOLStatsZod.LOLKillCounters,
            kills_series: SportApiLOLStatsZod.LOLKillSeries,
            largest_critical_strike: z.number().int().nullable(),
            largest_killing_spree: z.number().int().nullable(),
            largest_multi_kill: z.number().int().nullable(),
            level: z.number().int(),
            magic_damage: SportApiLOLStatsZod.LOLGamePlayerDamageForStats,
            masteries: z.array(
              z.object({
                id: z.number().int(),
                name: z.string(),
              })
            ),
            minions_killed: z.number().int(),
            opponent: z.union([
              SportApiLOLStatsZod.BaseTeam,
              SportApiLOLStatsZod.BasePlayer,
            ]),
            physical_damage: SportApiLOLStatsZod.LOLGamePlayerDamageForStats,
            player: SportApiLOLStatsZod.BasePlayer,
            player_id: z.number().int(),
            role: z.string(),
            runes: z.array(
              z.object({
                id: z.number().int(),
                name: z.string(),
              })
            ),
            runes_reforged: z.object({
              primary_path:
                SportApiLOLStatsZod.LOLPlayerPrimaryRunePath.nullable(),
              secondary_path: SportApiLOLStatsZod.LOLPlayerSecondaryRunePath,
              shards: z.object({
                defense: SportApiLOLStatsZod.LOLRunereForged,
                flex: SportApiLOLStatsZod.LOLRunereForged,
                offense: SportApiLOLStatsZod.LOLRunereForged,
              }),
            }),
            spells: z.array(
              z.object({
                id: z.number().int(),
                name: z.string(),
                image_url: z.string().nullable(),
              })
            ),
            team: SportApiLOLStatsZod.BaseTeam,

            total_damage: SportApiLOLStatsZod.LOLGamePlayerDamageForStats,

            total_heal: z.number().int().nullable(),
            total_time_crowd_control_dealt: z.number().int().nullable(),
            total_units_healed: z.number().int().nullable(),
            true_damage: SportApiLOLStatsZod.LOLGamePlayerDamageForStats,
            wards: SportApiLOLStatsZod.LOLWards,
            wards_placed: z.number().int(),
          })
        ),

        last_name: z.string().nullable(),
        modified_at: z.string(),
        name: z.string(),
        nationality: z.string().nullable(),
        role: z.string().nullable(),
        slug: z.string().nullable(),
        stats: z.array(
          z.object({
            averages: SportApiLOLStatsZod.LOLPlayerAveragesObject,
            games_count: z.number().int(),
            serie: SportApiLOLStatsZod.Serie,
            totals: SportApiLOLStatsZod.LOLPlayerStatsTotals,
          })
        ),

        teams: z.array(SportApiLOLStatsZod.BaseTeam),

        total_stats: z.object({
          averages: SportApiLOLStatsZod.LOLPlayerAveragesObject,
          games_count: z.number().int(),
          totals: SportApiLOLStatsZod.LOLPlayerStatsTotals,
        }),
      })
      .nullable(),
  };

  public static Call = async (
    params: z.infer<typeof this.Zod.Params>
  ): Promise<z.infer<typeof this.Zod.Response>> => {
    // const url = SportApiCore.URL(`${this.Path}`);

    const url = new URL(this.Path);

    url.searchParams.append(
      "token",
      "IVOpUlw-Q9FG4nt6Zlz2RUJvCcK0yAaNBMkJxZ-UBZPDZA1YNIA"
    );

    const rawRes = await SportApiCore.Request({
      url: url.toString(),
      method: "GET",
    });

    if (!rawRes.ok) {
      // 404
      if (rawRes.status === 404) {
        SportApiLogger.warn({
          err: {
            status: rawRes.status,
            statusText: rawRes.statusText,
          },
          url: url.toString(),
          input: params,
          route: this.Route,
        });

        return null;
      }

      SportApiLogger.error({
        err: {
          status: rawRes.status,
          statusText: rawRes.statusText,
        },
        url: url.toString(),
        input: params,
        route: this.Route,
      });

      throw new Error(`${this.Route}: Error while fetching player`);
    }

    const rawData: unknown = await rawRes.json();

    const validatedRes = this.Zod.Response.safeParse(rawData);

    if (!validatedRes.success) {
      SportApiLogger.error({
        err: validatedRes.error,
        json: rawData,
        input: params,
        route: this.Route,
      });

      throw new Error(`${this.Route}: Error while parsing player`);
    }

    return validatedRes.data;
  };
}
