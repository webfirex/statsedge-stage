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
    mapDataStatus: z.enum(["live", "verified"]),
    endTime: z.number().optional(),
    winnerId: z.string().optional(),
    startTime: z.number().optional(),
    roundScores: z.array(
      z.object({
        id: z.number(),
        roundsWon: z.number(),
        halfScores: z.array(z.number()),
      })
    ),
    teamStats: z.array(
      z.object({
        teamId: z.number(),
        kills: z.number(),
        headshots: z.number(),
        assists: z.number(),
        flash_assists: z.number(),
        deaths: z.number(),
        suicides: z.number(),
        entryKills: z.number(),
        startSide: z.enum(["CT", "Terrorist"]),
        players: z.array(
          z.object({
            kills: z.number(),
            headshots: z.number(),
            assists: z.number(),
            flash_assists: z.number(),
            deaths: z.number(),
            suicides: z.number(),
            entryKills: z.number(),
            kpr: z.number(),
            dpr: z.number(),
            adr: z.number(),
            clutches: z.array(
              z.object({
                round: z.number(),
                type: z.enum(["1v2", "1v3", "1v4", "1v5"]),
              })
            ),
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
