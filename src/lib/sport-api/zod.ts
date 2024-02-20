import { z } from "zod";
import { MoneyToThousands } from "../functions";

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

  private static VALOStats = z.object({
    adr: z.number(),
    kast: z.number(),
    kills: z.number(),
    deaths: z.number(),
    rating: z.number(),
    assists: z.number(),
    firstKills: z.number(),
    firstDeaths: z.number(),
    avgCombatScore: z.number(),
    headshotPercentage: z.number(),
  });

  public static VALORANT = z.object({
    status: this.$Status,
    mapNumber: z.number(),
    winnerId: z.number().nullable(),
    mapName: z.string(),
    mapDataStatus: z.enum(["live", "verified"]),
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
        startSide: z.enum(["attack", "defend", "Unknown"]),
        players: z.array(
          z.object({
            name: z.string(),
            agents: z.array(z.string()),
            plants: z.number(),
            defuses: z.number(),
            playerId: z.number(),
            econRating: z.number(),
            totalStats: this.VALOStats,
            attackStats: this.VALOStats,
            defendStats: this.VALOStats,
            multikills: z
              .array(
                z.object({
                  type: z.string(),
                  round: z.number(),
                })
              )
              .optional(),
            clutches: z
              .array(
                z.object({
                  round: z.number(),
                  type: z.enum(["1v1", "1v2", "1v3", "1v4", "1v5"]),
                })
              )
              .optional(),
          })
        ),
      })
    ),
  });

  public static DOTA2 = z
    .object({
      mapNumber: z.number(),
      status: this.$Status,
      winnerId: z.number().nullable(),
      mapDataStatus: z.enum(["live", "verified"]),
      teamStats: z.array(
        z.object({
          teamId: z.number(),
          towersDestroyed: z.number(),
          players: z.array(
            z.object({
              playerId: z.number(),
              name: z.string().nullable(),
              kills: z.number(),
              deaths: z.number(),
              assists: z.number(),
              heroDamage: z.number(),
              cs: z.number(),
              denies: z.number(),
              gold: z.number(),
              towersDestroyed: z.number(),
            })
          ),
        })
      ),
    })
    .transform((data) => {
      return {
        ...data,
        teamStats: data.teamStats.map((team) => {
          let _gold = 0;
          let _kills = 0;

          for (const player of team.players) {
            _gold += player.gold;
            _kills += player.kills;
          }

          return {
            ...team,
            gold: MoneyToThousands(_gold),
            kills: _kills,
          };
        }),
      };
    });

  public static LOL = z
    .object({
      mapNumber: z.number(),
      status: this.$Status,
      mapDataStatus: z.enum(["live", "verified"]),
      winnerId: z.unknown().transform((data) => {
        if (data === null) {
          return null;
        }
        return Number(data);
      }),
      duration: z.number().nullable(),
      teamStats: z.array(
        z.object({
          side: z.enum(["blue", "red"]).optional(),
          teamId: z.number(),
          towersDestroyed: z.number(),
          inhibitorsDestroyed: z.number(),
          dragonKills: z.number(),
          riftHeraldKills: z.number().nullable(),
          baronKills: z.number(),
          elderDragonKills: z.number(),
          players: z.array(
            z.object({
              playerId: z.number(),
              name: z.string(),
              kills: z.number(),
              deaths: z.number(),
              assists: z.number(),
              championDamage: z.number().nullable(),
              cs: z.number(),
              gold: z.number().nullable(),
              goldSpent: z.number().nullable(),
              towersDestroyed: z.number().nullable(),
              dragonKills: z.number().nullable(),
              baronKills: z.number().nullable(),
            })
          ),
        })
      ),

      firsts: z.object({
        firstBaron: z
          .object({
            teamId: z.number().nullable(),
          })
          .optional(),
        firstBlood: z
          .object({
            teamId: z.number().nullable(),
            playerId: z.number().nullable(),
          })
          .optional(),
        firstTower: z
          .object({
            teamId: z.number().nullable(),
          })
          .optional(),
        firstDragon: z
          .object({
            teamId: z.number().nullable(),
          })
          .optional(),
        firstInhibitor: z
          .object({
            teamId: z.number().nullable(),
          })
          .optional(),
        firstRiftHerald: z
          .object({
            teamId: z.number().nullable(),
          })
          .optional(),
      }),
    })
    .transform((data) => {
      return {
        ...data,
        teamStats: data.teamStats.map((team) => {
          let _gold = 0;
          let _kills = 0;

          for (const player of team.players) {
            _gold += player.gold ?? 0;
            _kills += player.kills;
          }

          return {
            ...team,
            gold: MoneyToThousands(_gold),
            kills: _kills,
          };
        }),
      };
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
            score: z.number().optional(),
            timeAlive: z.number().optional(),
            distanceTraveled: z.number().optional(),
            movementPercentage: z.number().optional(),
            averageSpeed: z.number().optional(),
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
              aces: z.number().optional(),
              shotsHit: z.number().optional(),
              headshots: z.number().optional(),
              shotsFired: z.number().optional(),
              damageDealt: z.number().optional(),
              damageTaken: z.number().optional(),
              lethalsUsed: z.number().optional(),
              tradedKills: z.number().optional(),
              damageHealed: z.number().optional(),
              tradedDeaths: z.number().optional(),
              tacticalsUsed: z.number().optional(),
              untradedKills: z.number().optional(),
              untradedDeaths: z.number().optional(),
              highestMultikill: z.number().optional(),
              highestKillStreak: z.number().optional(),
              friendlyFireDamage: z.number().optional(),
            }),

            specialKills: z.object({
              wallbangs: z.number().optional(),
              firstBloods: z.number().optional(),
              defuserKills: z.number().optional(),
              planterKills: z.number().optional(),
              revengeKills: z.number().optional(),
              longshotKills: z.number().optional(),
              rotationKills: z.number().optional(),
              pointblankKills: z.number().optional(),
              inVictimFoVKills: z.number().optional(),
              inAttackerFoVKills: z.number().optional(),
            }),
          })
        ),
      })
    ),
  });

  public static RL = z.object({});
}

class EventBaseZod {
  public static Auth = z.object({
    type: z.enum(["auth"]),
  });

  public static Alive = z.object({
    type: z.enum(["pong"]),
  });

  public static PayloadBase = z.object({
    snapshotNumber: z.number(),
    fixtureId: z.number(),
    timestamp: z.number(),
  });

  public static EventBase = z.object({
    sortIndex: z.number(),
    type: z.enum(["occurrence"]),
  });

  public static FixtureStarted = this.EventBase.extend({
    type: z.enum(["fixture_started"]),
    payload: this.PayloadBase.extend({
      participants: z.array(
        z.object({
          id: z.number(),
        })
      ),
    }),
  });

  public static FixtureEnded = this.EventBase.extend({
    type: z.enum(["fixture_ended"]),
    payload: this.PayloadBase.extend({
      winnerId: z.number().nullable(),
      tie: z.boolean(),
      participants: z.array(
        z.object({
          id: z.number(),
          score: z.number(),
          name: z.string(),
        })
      ),
    }),
  });

  public static ScoreChange = this.EventBase.extend({
    type: z.enum(["score_change"]),
    payload: this.PayloadBase.extend({
      participants: z.array(
        z.object({
          id: z.number(),
          score: z.number(),
        })
      ),
    }),
  });
}

class EventCSGOZod {
  public static MapStarted = EventBaseZod.EventBase.extend({
    payload: EventBaseZod.PayloadBase.extend({
      name: z.enum(["map_started"]),
      mapName: z.string(),
      mapNumber: z.number(),
      participants: z.array(
        z.object({
          id: z.number(),
        })
      ),
    }),
  });

  public static MapEnded = EventBaseZod.EventBase.extend({
    payload: EventBaseZod.PayloadBase.extend({
      name: z.enum(["map_ended"]),
      mapNumber: z.number(),
      winnerId: z.number().nullable(),
      tie: z.boolean(),
      halfNumber: z.number(),
      roundNumber: z.number(),
      participants: z.array(
        z.object({
          id: z.number(),
          score: z.number(),
          roundsWon: z.number(),
        })
      ),
    }),
  });

  public static MapVoided = EventBaseZod.EventBase.extend({
    payload: EventBaseZod.PayloadBase.extend({
      name: z.enum(["map_voided"]),
      mapNumber: z.number(),
      halfNumber: z.number(),
      roundNumber: z.number(),
    }),
  });

  public static RoundStarted = EventBaseZod.EventBase.extend({
    payload: EventBaseZod.PayloadBase.extend({
      name: z.enum(["round_started"]),
      mapNumber: z.number(),
      halfNumber: z.number(),
      roundNumber: z.number(),
    }),
  });

  public static RoundEnded = EventBaseZod.EventBase.extend({
    payload: EventBaseZod.PayloadBase.extend({
      name: z.enum(["round_ended"]),
      mapNumber: z.number(),
      halfNumber: z.number(),
      roundNumber: z.number(),
      winnerId: z.number().nullable(),
      winCondition: z.string(),
      participants: z.array(
        z.object({
          id: z.number(),
          roundsWon: z.number(),
        })
      ),
    }),
  });

  public static RoundVoided = EventBaseZod.EventBase.extend({
    payload: EventBaseZod.PayloadBase.extend({
      name: z.enum(["round_voided"]),
      mapNumber: z.number(),
      halfNumber: z.number(),
      roundNumber: z.number(),
    }),
  });

  public static HalfStarted = EventBaseZod.EventBase.extend({
    payload: EventBaseZod.PayloadBase.extend({
      name: z.enum(["half_started"]),
      mapNumber: z.number(),
      halfNumber: z.number(),
    }),
  });

  public static All = z.union([
    EventBaseZod.Auth,
    EventBaseZod.Alive,
    EventBaseZod.FixtureStarted,
    EventBaseZod.FixtureEnded,
    EventBaseZod.ScoreChange,
  ]);
}

export class SportApiZod {
  public static Map = MapZod;
  public static Event = {
    CSGO: EventCSGOZod,
  };

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
