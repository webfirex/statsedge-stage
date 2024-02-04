import { z } from "zod";

/**
 * TODO: Complete this
 *
 * https://docs.gamescorekeeper.com/#rest_api_get_fixture_map_schemas
 */
class MapZod {
  public static $Status = z.enum(["live", "ended"]);

  public static Base = z.object({
    status: this.$Status,
    mapNumber: z.number(),
  });

  public static CSGO = z.object({
    status: this.$Status,
    mapNumber: z.number(),
    mapName: z.string(),
    mapDataStatus: z.enum(["live", "verified"]),
    endTime: z.number().optional().nullable(),
    winnerId: z.string().optional().nullable(),
    startTime: z.number().optional().nullable(),
    roundScores: z.array(
      z.object({
        id: z.number(),
        roundsWon: z.number(),
        halfScores: z.array(z.number()).optional(),
      })
    ),
    teamStats: z.array(
      z.object({
        teamId: z.number(),
        kills: z.number(),
        headshots: z.number(),
        assists: z.number().optional(),
        flash_assists: z.number().optional(),
        deaths: z.number(),
        suicides: z.number(),
        entryKills: z.number().optional(),
        startSide: z.enum(["CT", "Terrorist"]).optional(),
        players: z.array(
          z.object({
            kills: z.number(),
            headshots: z.number(),
            assists: z.number().optional(),
            flash_assists: z.number().optional(),
            deaths: z.number(),
            suicides: z.number(),
            entryKills: z.number().optional(),
            kpr: z.number().optional(),
            dpr: z.number().optional(),
            adr: z.number().optional(),
            name: z.string(),
            clutches: z
              .array(
                z.object({
                  round: z.number(),
                  type: z.enum(["1v2", "1v3", "1v4", "1v5"]),
                })
              )
              .optional(),
          })
        ),
      })
    ),
  });

  public static VALORANT = z.object({
    status: this.$Status,
    mapNumber: z.number(),
  });

  public static DOTA2 = z.object({
    mapNumber: z.number(),
    status: this.$Status,
  });

  public static LOL = z.object({
    mapNumber: z.number(),
    status: this.$Status,
  });

  public static HOK = z.object({
    mapNumber: z.number(),
    status: this.$Status,
  });

  public static COD = z.object({
    mapNumber: z.number(),
    status: this.$Status,
    winnerId: z.number().optional().nullable(),
    mode: z.enum(["Hardpoint", "Search & Destroy", "Control"]),
    mapName: z.string(),
    mapScores: z.array(
      z.object({
        teamId: z.number(),
        score: z.number(),
      })
    ),
    teamStats: z.array(
      z.object({
        teamId: z.number(),
        players: z.array(
          z.object({
            playerId: z.number(),
            name: z.string(),
            kills: z.number(),
            assists: z.number(),
            deaths: z.number(),
            score: z.number(),
            timeAlive: z.number(),
            distanceTraveled: z.number(),
            movementPercentage: z.number(),
            averageSpeed: z.number(),
            objectives: z.object({
              hillTime: z.number().optional(),
              contestedHillTime: z.number().optional(),
              bombsDefused: z.number().optional(),
              bombsPlanted: z.number().optional(),
              sneakDefuses: z.number().optional(),
              objectivesCaptured: z.number().optional(),
              objectiveTiersContributed: z.number().optional(),
            }),

            combatStats: z.object({
              aces: z.number(),
              shotsHit: z.number(),
              headshots: z.number(),
              shotsFired: z.number(),
              damageDealt: z.number(),
              damageTaken: z.number(),
              lethalsUsed: z.number(),
              tradedKills: z.number(),
              damageHealed: z.number(),
              tradedDeaths: z.number(),
              tacticalsUsed: z.number(),
              untradedKills: z.number(),
              untradedDeaths: z.number(),
              highestMultikill: z.number(),
              highestKillStreak: z.number(),
              friendlyFireDamage: z.number(),
            }),

            specialKills: z.object({
              wallbangs: z.number(),
              firstBloods: z.number(),
              defuserKills: z.number(),
              planterKills: z.number(),
              revengeKills: z.number(),
              longshotKills: z.number(),
              rotationKills: z.number(),
              pointblankKills: z.number(),
              inVictimFoVKills: z.number(),
              inAttackerFoVKills: z.number(),
            }),
          })
        ),
      })
    ),
  });
}

export class SportApiZod {
  public static Map = MapZod;

  // ====================

  public static $Status = z.enum([
    "Scheduled",
    "Started",
    "Ended",
    "Forfeited",
    "Cancelled",
  ]);

  public static $Time = z.number().int();

  // ====================

  public static Competition = z.object({
    id: z.number(),
    name: z.string(),
    derivatives: z.record(z.string()).nullable(),
  });

  public static Format = z.object({
    name: z.string(),
    value: z.number(),
  });

  public static Sport = z.object({
    alias: z.string(),
    name: z.string(),
  });

  public static Participants = z.object({
    id: z.number().nullable(),
    name: z.string().nullable(),
    score: z.number(),
    scoreWithoutHandicap: z.number(),
    handicap: z.number(),
  });

  public static Links = z.object({
    rel: z.enum(["liveapi", "v2live"]),
    link: z.string(),
  });
}

export type SportMatchStatus = z.infer<typeof SportApiZod.$Status>;
export type SportMatchParticipants = z.infer<typeof SportApiZod.Participants>;
