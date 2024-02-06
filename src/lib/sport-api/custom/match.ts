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

      return params.maps.map((map) => {
        const _Map = stats?.maps.find((s) => s.mapNumber === map.mapNumber);

        if (!_Map) {
          return map;
        }

        const newTeamStats = map.teamStats.map((team) => {
          const _Team = _Map.teamStats.find((s) => s.teamId === team.teamId);

          if (!_Team) {
            return team;
          }

          const newPlayerStats = team.players.map((player) => {
            const _Player = _Team.players.find(
              (s) => s.playerId === player.playerId
            );

            if (!_Player) {
              return player;
            }

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

      return params.maps.map((map) => {
        const _Map = stats?.maps.find((s) => s.mapNumber === map.mapNumber);

        if (!_Map) {
          return map;
        }

        const newTeamStats = map.teamStats.map((team) => {
          const _Team = _Map.teamStats.find((s) => s.teamId === team.teamId);

          if (!_Team) {
            return team;
          }

          const newPlayerStats = team.players.map((player) => {
            const _Player = _Team.players.find(
              (s) => s.playerId === player.playerId
            );

            if (!_Player) {
              return player;
            }

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

    return {
      ...FixtureDB,
      sport: sportInfo,
      maps: {
        ...FixtureDB.maps,
        csgo: FixtureDB.maps?.csgo,
        cod: FixtureDB.maps?.cod,
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
