import { z } from "zod";
import { SportApiLogger } from "../core";
import { FixtureGet } from "../fixture/get";
import { TeamGet } from "../team/get";
import { TeamForm } from "../team/form";
import { FixtureMetadata } from "../fixture/metadata";
import { SportInfo } from "~/lib/functions";
import { type UnwrapPromise } from "next/dist/lib/coalesced-function";
import { LocalCache } from "~/server/cache";
import { PlayerGet } from "../player/get";
import { FixtureStatsDOTA } from "../fixture/stats-dota";
import { PickBanMaps } from "../pickban/maps";
import { PickBanHeroes } from "../pickban/heroes";
import { FixtureStatsLOL } from "../fixture/stats-lol";
import { TeamStats } from "../team/stats";

type HalfFixture = Exclude<
  UnwrapPromise<ReturnType<typeof TeamForm.Call>>,
  null
>["fixtures"][0];

type PickBanHeroType = Exclude<
  UnwrapPromise<ReturnType<typeof PickBanHeroes.Call>>,
  null
>["pickBan"];

export class CustomMatch {
  public static readonly Route = "CustomMatch";

  public static readonly Zod = {
    Params: z.object({
      id: z.number(),
    }),
  };

  private static Fixture = async (id: number) => {
    const FixtureDB = await FixtureGet.Call({ id });

    if (!FixtureDB) {
      return null;
    }

    const sportInfo = SportInfo(FixtureDB.sport.alias);

    if (!sportInfo) {
      return null;
    }

    const MergeDOTAStatsInMap = async (params: {
      maps: Exclude<
        Exclude<typeof FixtureDB.maps, undefined>["dota2"],
        undefined
      >;
    }) => {
      const stats = await FixtureStatsDOTA.Call({ id });

      if (!stats) {
        return [];
      }

      return params.maps.map((map) => {
        const _Map = stats.maps.find((s) => s.mapNumber === map.mapNumber)!;

        const newTeamStats = map.teamStats.map((team) => {
          const _Team = _Map.teamStats.find((s) => s.teamId === team.teamId)!;

          const newPlayerStats = team.players.map((player) => {
            const _Player = _Team.players.find(
              (s) => s.playerId === player.playerId
            )!;

            return {
              ...player,
              ..._Player,
            };
          });

          return {
            ...team,
            players: newPlayerStats,
          };
        });

        return {
          ...map,
          teamStats: newTeamStats,
        };
      });
    };

    const MergeLOLStatsInMap = async (params: {
      maps: Exclude<
        Exclude<typeof FixtureDB.maps, undefined>["lol"],
        undefined
      >;
    }) => {
      const stats = await FixtureStatsLOL.Call({ id });

      if (!stats) {
        return [];
      }

      return params.maps.map((map) => {
        const _Map = stats.maps.find((s) => s.mapNumber === map.mapNumber)!;

        const newTeamStats = map.teamStats.map((team) => {
          const _Team = _Map.teamStats.find((s) => s.teamId === team.teamId)!;

          const newPlayerStats = team.players.map((player) => {
            const _Player = _Team.players.find(
              (s) => s.playerId === player.playerId
            )!;

            return {
              ...player,
              ..._Player,
            };
          });

          return {
            ...team,
            players: newPlayerStats,
          };
        });

        return {
          ...map,
          teamStats: newTeamStats,
        };
      });
    };

    const AllMapsCSGO = (params: {
      maps: Exclude<
        Exclude<typeof FixtureDB.maps, undefined>["csgo"],
        undefined
      >;
    }) => {
      const oneTeamStats = params.maps.reduce((acc, curr) => {
        const newTeamStats = curr.teamStats.map((team) => {
          const teamStatss = acc.find((s) => s.teamId === team.teamId);

          if (!teamStatss) {
            return team;
          }

          return {
            teamId: team.teamId,
            deaths: team.deaths + teamStatss.deaths,
            headshots: team.headshots + teamStatss.headshots,
            kills: team.kills + teamStatss.kills,
            assists: (team.assists ?? 0) + (teamStatss.assists ?? 0),
            suicides: team.suicides + teamStatss.suicides,
            entryKills: (team.entryKills ?? 0) + (teamStatss.entryKills ?? 0),
            flash_assists:
              (team.flash_assists ?? 0) + (teamStatss.flash_assists ?? 0),
            startSide: team.startSide,
            players: team.players.map((player) => {
              const _Player = teamStatss.players.find(
                (s) => s.name === player.name
              );

              if (!_Player) {
                return player;
              }

              return {
                deaths: player.deaths + _Player.deaths,
                headshots: player.headshots + _Player.headshots,
                kills: player.kills + _Player.kills,
                name: player.name,
                suicides: player.suicides + _Player.suicides,
                adr: (player.adr ?? 0) + (_Player.adr ?? 0),
                assists: (player.assists ?? 0) + (_Player.assists ?? 0),
                kpr: (player.kpr ?? 0) + (_Player.kpr ?? 0),
                clutches: player.clutches,
                dpr: (player.dpr ?? 0) + (_Player.dpr ?? 0),
                entryKills:
                  (player.entryKills ?? 0) + (_Player.entryKills ?? 0),
                flash_assists:
                  (player.flash_assists ?? 0) + (_Player.flash_assists ?? 0),
              } as typeof player;
            }),
          } as typeof team;
        });

        return newTeamStats;
      }, [] as (typeof params.maps)[0]["teamStats"]);

      return oneTeamStats;
    };

    const AllMapsCOD = (params: {
      maps: Exclude<
        Exclude<typeof FixtureDB.maps, undefined>["cod"],
        undefined
      >;
    }) => {
      const oneTeamStats = params.maps.reduce((acc, curr) => {
        const newTeamStats = curr.teamStats.map((team) => {
          const teamStatss = acc.find((s) => s.teamId === team.teamId);

          if (!teamStatss) {
            return team;
          }

          return {
            teamId: team.teamId,
            players: team.players.map((player) => {
              const _Player = teamStatss.players.find(
                (s) => s.name === player.name
              );

              if (!_Player) {
                return player;
              }

              return {
                playerId: player.playerId,
                name: player.name,
                kills: player.kills + _Player.kills,
                assists: player.assists + _Player.assists,
                deaths: player.deaths + _Player.deaths,
                score: (player.score ?? 0) + (_Player.score ?? 0),
                timeAlive: (player.timeAlive ?? 0) + (_Player.timeAlive ?? 0),
                distanceTraveled:
                  (player.distanceTraveled ?? 0) +
                  (_Player.distanceTraveled ?? 0),
                movementPercentage:
                  (player.movementPercentage ?? 0) +
                  (_Player.movementPercentage ?? 0),
                averageSpeed:
                  (player.averageSpeed ?? 0) + (_Player.averageSpeed ?? 0),
                objectives: {
                  bombsDefused:
                    (player.objectives.bombsDefused ?? 0) +
                    (_Player.objectives.bombsDefused ?? 0),
                  bombsPlanted:
                    (player.objectives.bombsPlanted ?? 0) +
                    (_Player.objectives.bombsPlanted ?? 0),
                  contestedHillTime:
                    (player.objectives.contestedHillTime ?? 0) +
                    (_Player.objectives.contestedHillTime ?? 0),
                  hillTime:
                    (player.objectives.hillTime ?? 0) +
                    (_Player.objectives.hillTime ?? 0),
                  objectivesCaptured:
                    (player.objectives.objectivesCaptured ?? 0) +
                    (_Player.objectives.objectivesCaptured ?? 0),
                  objectiveTiersContributed:
                    (player.objectives.objectiveTiersContributed ?? 0) +
                    (_Player.objectives.objectiveTiersContributed ?? 0),
                  sneakDefuses:
                    (player.objectives.sneakDefuses ?? 0) +
                    (_Player.objectives.sneakDefuses ?? 0),
                },

                combatStats: {
                  damageDealt:
                    (player.combatStats.damageDealt ?? 0) +
                    (_Player.combatStats.damageDealt ?? 0),
                  damageTaken:
                    (player.combatStats.damageTaken ?? 0) +
                    (_Player.combatStats.damageTaken ?? 0),
                },
                specialKills: {},
              } as typeof player;
            }),
          };
        });

        return newTeamStats;
      }, [] as (typeof params.maps)[0]["teamStats"]);

      return oneTeamStats;
    };

    const AllMapsValo = (params: {
      maps: Exclude<
        Exclude<typeof FixtureDB.maps, undefined>["valorant"],
        undefined
      >;
    }) => {
      const oneTeamStats = params.maps.reduce((acc, curr) => {
        const newTeamStats = curr.teamStats.map((team) => {
          const teamStatss = acc.find((s) => s.teamId === team.teamId);

          if (!teamStatss) {
            return team;
          }

          return {
            teamId: team.teamId,
            players: team.players.map((player) => {
              const _Player = teamStatss.players.find(
                (s) => s.name === player.name
              );

              if (!_Player) {
                return player;
              }

              return {
                playerId: player.playerId,
                name: player.name,
                agents: player.agents,
                econRating: player.econRating + _Player.econRating,
                defuses: player.defuses + _Player.defuses,
                plants: player.plants + _Player.plants,
                clutches: [],
                multikills: [],
                totalStats: {
                  kills: player.totalStats.kills + _Player.totalStats.kills,
                  deaths: player.totalStats.deaths + _Player.totalStats.deaths,
                  assists:
                    player.totalStats.assists + _Player.totalStats.assists,
                  headshotPercentage:
                    (player.totalStats.headshotPercentage ?? 0) +
                    (_Player.totalStats.headshotPercentage ?? 0),
                  firstKills:
                    player.totalStats.firstKills +
                    _Player.totalStats.firstKills,
                  firstDeaths:
                    player.totalStats.firstDeaths +
                    _Player.totalStats.firstDeaths,
                },
                defendStats: {},
                attackStats: {},
              };
            }),
          };
        }) as (typeof curr)["teamStats"];

        return newTeamStats;
      }, [] as (typeof params.maps)[0]["teamStats"]);

      return oneTeamStats;
    };

    // console.log(JSON.stringify(FixtureDB.maps?.cod, null, 2));

    return {
      ...FixtureDB,
      sport: sportInfo,
      mapStats: {
        one:
          FixtureDB.maps?.csgo && FixtureDB.participants.one?.id
            ? await TeamStats.Call({ id: FixtureDB.participants.one.id })
            : null,
        two:
          FixtureDB.maps?.csgo && FixtureDB.participants.two?.id
            ? await TeamStats.Call({ id: FixtureDB.participants.two.id })
            : null,
      },
      allMaps: {
        csgo: FixtureDB.maps?.csgo
          ? AllMapsCSGO({ maps: FixtureDB.maps.csgo })
          : [],

        cod: FixtureDB.maps?.cod
          ? AllMapsCOD({ maps: FixtureDB.maps.cod })
          : [],

        valorant: FixtureDB.maps?.valorant
          ? AllMapsValo({ maps: FixtureDB.maps.valorant })
          : [],
      },
      maps: {
        ...FixtureDB.maps,
        csgo: FixtureDB.maps?.csgo,
        cod: FixtureDB.maps?.cod,
        valo: FixtureDB.maps?.valorant,
        dota2:
          FixtureDB.sport.alias === "dota2"
            ? await MergeDOTAStatsInMap({
                maps: FixtureDB.maps?.dota2 ?? [],
              })
            : undefined,
        lol:
          FixtureDB.sport.alias === "lol"
            ? await MergeLOLStatsInMap({
                maps: FixtureDB.maps?.lol ?? [],
              })
            : undefined,
      },
    };
  };

  private static ParseHeroPickBan = (params: {
    pickBan: PickBanHeroType;
    teamOneId: number;
    teamTwoId: number;
  }) => {
    const DividedByTeam = params.pickBan.reduce(
      (acc, curr) => {
        if (curr.teamId === params.teamOneId) {
          acc.one.push(curr);
        } else {
          acc.two.push(curr);
        }

        return acc;
      },
      {
        one: [] as typeof params.pickBan,
        two: [] as typeof params.pickBan,
      }
    );

    const _DividedByType = (team: typeof DividedByTeam.one) => {
      return team.reduce(
        (acc, curr) => {
          if (curr.type === "pick") {
            acc.pick.push(curr);
          } else {
            acc.ban.push(curr);
          }

          return acc;
        },
        {
          pick: [] as typeof DividedByTeam.one,
          ban: [] as typeof DividedByTeam.one,
        }
      );
    };

    return {
      one: _DividedByType(DividedByTeam.one),
      two: _DividedByType(DividedByTeam.two),
    };
  };

  public static Call = async (params: z.infer<typeof this.Zod.Params>) => {
    const CacheKey = `match-${params.id}`;

    type StoredCacheType = typeof Result;

    const CachedMatch = LocalCache.get<StoredCacheType>(CacheKey);

    if (CachedMatch) {
      SportApiLogger.info({
        date: new Date().toUTCString(),
        input: params,
        route: this.Route,
        cached: true,
      });

      return CachedMatch;
    }

    const fixture = await this.Fixture(params.id);

    if (!fixture) {
      return null;
    }

    console.log(JSON.stringify(fixture.mapStats, null, 2));

    if (!fixture.participants.one && !fixture.participants.two) {
      return null;
    }

    const _DetailedFixture = async (halfFixture: HalfFixture[]) => {
      const DetailedFixture = await Promise.all(
        halfFixture.map((fixture) => {
          return FixtureGet.Call({ id: fixture.fixtureId });
        })
      );

      return halfFixture.map((fixture) => {
        const HistoryFixture = DetailedFixture.find(
          (f) => f?.id === fixture.fixtureId
        )!;

        return {
          ...fixture,
          detail: HistoryFixture,
        };
      });
    };

    const _DetailedParti = async (parti: typeof fixture.participants.one) => {
      if (!parti) {
        return null;
      }

      const [team, recent_matches] = await Promise.all([
        TeamGet.Call({ id: parti.id }),
        TeamForm.Call({
          id: parti.id,
        }),
      ]);

      if (!team) {
        SportApiLogger.fatal({
          participant: parti,
          params,
          route: this.Route,
        });

        throw new Error("Error while fetching team");
      }

      const DetailedPlayers =
        team.most_recent_lineup && team.most_recent_lineup.length > 0
          ? await Promise.all(
              team.most_recent_lineup.map(async (player) => {
                const _detailPlayer = await PlayerGet.Call({ id: player.id });

                return {
                  ..._detailPlayer,
                  ...player,
                };
              })
            )
          : [];

      const DetailedTeam = {
        ...team,
        most_recent_lineup: DetailedPlayers,
      };

      if (!recent_matches) {
        return {
          ...parti,
          team: DetailedTeam,
          recent_matches,
        };
      }

      const DetailedRecentMatches = await _DetailedFixture(
        recent_matches.fixtures
      );

      return {
        ...parti,
        team: DetailedTeam,
        recent_matches: {
          ...recent_matches,
          fixtures: DetailedRecentMatches,
        },
      };
    };

    const _OpponentMatches = async (parti: typeof fixture.participants) => {
      if (!parti.one || !parti.two) {
        return null;
      }

      const OpponentMatches = await TeamForm.Call({
        id: parti.one.id,
        opponentId: parti.two.id,
      });

      if (!OpponentMatches) {
        return null;
      }

      const DetailedOpponentMatches = await _DetailedFixture(
        OpponentMatches.fixtures
      );

      return {
        ...OpponentMatches,
        fixtures: DetailedOpponentMatches,
      };
    };

    const OpponentMatchesPromise = _OpponentMatches(fixture.participants);

    const StreamsPromise = FixtureMetadata.Call({
      id: params.id,
      attribute: "streamUrl",
    });

    const PickBanMapPromise = PickBanMaps.Call({
      id: params.id,
    });

    const PickBanHeroesPromise = PickBanHeroes.Call({
      id: params.id,
    });

    const [
      TeamOne,
      TeamTwo,
      Streams,
      OpponentMatches,
      PickBanMap,
      PickBanHeros,
    ] = await Promise.all([
      _DetailedParti(fixture.participants.one),
      _DetailedParti(fixture.participants.two),
      StreamsPromise,
      OpponentMatchesPromise,
      PickBanMapPromise,
      PickBanHeroesPromise,
    ]);

    const Result = {
      ...fixture,
      participants: {
        one: TeamOne,
        two: TeamTwo,
      },
      stream: Streams,
      opponentMatches: OpponentMatches,
      pickBanMap: PickBanMap?.pickBan ?? undefined,
      pickBanHero: PickBanHeros?.pickBan
        ? this.ParseHeroPickBan({
            pickBan: PickBanHeros.pickBan,
            teamOneId: TeamOne?.id ?? 0,
            teamTwoId: TeamTwo?.id ?? 0,
          })
        : undefined,
    };

    LocalCache.set(CacheKey, Result, 10);

    SportApiLogger.info({
      date: new Date().toUTCString(),
      input: params,
      route: this.Route,
      cached: false,
    });

    return Result;
  };
}
